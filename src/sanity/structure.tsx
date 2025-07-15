import type { StructureResolver } from 'sanity/structure'
import {
  EarthGlobeIcon,
  CogIcon,
  CaseIcon,
  DocumentTextIcon,
  HomeIcon,
  CommentIcon,
  CreditCardIcon,
  BottleIcon,
  IceCreamIcon,
  ComposeIcon,
} from '@sanity/icons'
import { CUSTOM_STRUCTURED_SCHEMAS } from './schemaTypes'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Панель управления')
    .items([
      ...S.documentTypeListItems().filter((listItem) => !CUSTOM_STRUCTURED_SCHEMAS.includes(listItem.getId() ?? '')),
      S.listItem()
        .title('Посадочная страница')
        .id('landing')
        .icon(() => {
          return <EarthGlobeIcon />
        })
        .child(
          S.list()
            .title('Секции')
            .items([
              S.listItem()
                .title('Главная')
                .id('hero')
                .icon(() => {
                  return <HomeIcon />
                })
                .child(S.document().schemaType('hero').documentId('hero').title('Главная')),
              S.listItem()
                .title('Про нас')
                .id('about')
                .icon(() => {
                  return <CommentIcon />
                })
                .child(S.document().schemaType('about').documentId('about').title('Про нас')),
              S.listItem()
                .title('Отзывы')
                .id('reviews')
                .icon(() => {
                  return <DocumentTextIcon />
                })
                .child(S.document().schemaType('reviews').documentId('reviews').title('Отзывы')),
              S.listItem()
                .title('Промо-секция')
                .id('promo')
                .icon(() => {
                  return <CreditCardIcon />
                })
                .child(S.document().schemaType('promo').documentId('promo').title('Промо-секция')),
            ])
        ),
      S.listItem()
        .title('Программы')
        .id('programs')
        .icon(() => {
          return <CaseIcon />
        })
        .child(
          S.list()
            .title('Программы')
            .items([
              S.listItem()
                .title('Конструктор программ')
                .id('programBuilder')
                .icon(() => {
                  return <ComposeIcon />
                })
                .child(
                  S.editor().schemaType('programBuilder').documentId(`programBuilder-${new Date().getTime()}`).title('Новая программа')
                ),
              S.listItem()
                .title('Тренировки')
                .id('trainingPrograms')
                .icon(() => {
                  return <BottleIcon />
                })
                .child(S.documentTypeList('programBuilder').title('Тренировки').filter('_type == "programBuilder" && type == "training"')),
              S.listItem()
                .title('Диеты')
                .id('dietPrograms')
                .icon(() => {
                  return <IceCreamIcon />
                })
                .child(S.documentTypeList('programBuilder').title('Диеты').filter('_type == "programBuilder" && type == "diet"')),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Общие настройки')
        .id('settings')
        .icon(() => {
          return <CogIcon />
        })
        .child(S.document().schemaType('settings').documentId('settings').title('Общие настройки')),
    ])
