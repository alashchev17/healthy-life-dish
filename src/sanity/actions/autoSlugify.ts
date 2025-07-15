import speakingurl from 'speakingurl'
import { type DocumentActionComponent, DocumentActionDescription, DocumentActionProps, useDocumentOperation } from 'sanity'

// Define interfaces for document structure
interface SanitySlug {
  _type: 'slug'
  current: string
}

interface SanityDocument {
  title?: string
  slug?: SanitySlug
  // eslint-disable-next-line
  [key: string]: any
}

export function AutoSlugifyAction(originalPublishAction: DocumentActionComponent): DocumentActionComponent {
  return (props: DocumentActionProps): DocumentActionDescription => {
    // use the hook to get access to the patch function with the current document
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { patch } = useDocumentOperation(props.id, props.type)

    const patchSlug = (slugValue: string): void => {
      patch.execute([
        {
          set: {
            slug: {
              current: slugValue,
              _type: 'slug',
            },
          },
        },
      ])
    }

    const originalResult = originalPublishAction(props)
    if (!originalResult) throw new Error('Something went wrong')
    return {
      ...originalResult,
      onHandle: async (): Promise<void> => {
        const draft = props.draft as SanityDocument | undefined

        if (!draft) {
          return originalResult.onHandle?.()
        }

        // Check for a title
        if (draft.title) {
          // Generate a slug from the title
          const generatedSlug = defaultSlugify(draft.title)

          // Apply the slug if one was generated and it's different from the current one
          if (generatedSlug && generatedSlug !== draft.slug?.current) {
            patchSlug(generatedSlug)
          }
        }

        // Then delegate to original handler
        originalResult.onHandle?.()
      },
    }
  }
}

interface SlugifyOptions {
  truncate: number
  symbols: boolean
}

const defaultSlugify = (value: string): string => {
  const slugifyOpts: SlugifyOptions = { truncate: 200, symbols: true }
  return value ? speakingurl(value, slugifyOpts) : ''
}
