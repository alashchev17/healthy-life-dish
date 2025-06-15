import { Typography } from "#/design/Layout/shared/Typography";
import { HighlightedText } from "#/design/ui/shared";

// Mock data to demonstrate the HighlightedText component
const mockHighlightedContent = [
  {
    _type: "block",
    _key: "demo1",
    children: [
      {
        _type: "span",
        _key: "span1",
        text: "З НАМИ ВИ ЗМОЖЕТЕ ",
      },
      {
        _type: "span",
        _key: "span2",
        text: "ПОКРАЩИТИ СВОЮ ФІЗИЧНУ ФОРМУ",
        marks: ["highlight"],
      },
      {
        _type: "span",
        _key: "span3",
        text: ", ",
      },
      {
        _type: "span",
        _key: "span4",
        text: "НАЛАШТУВАТИ ХАРЧУВАННЯ",
        marks: ["highlight"],
      },
      {
        _type: "span",
        _key: "span5",
        text: " ТА ",
      },
      {
        _type: "span",
        _key: "span6",
        text: "ОТРИМАТИ ПІДТРИМКУ",
        marks: ["highlight"],
      },
      //
      {
        _type: "span",
        _key: "span7",
        text: " НА ШЛЯХУ ДО ЗДОРОВІШОГО І ЩАСЛИВІШОГО ЖИТТЯ. МИ ДОПОМОЖЕМО ВАМ СТАТИ НАЙКРАЩОЮ ВЕРСІЄЮ СЕБЕ!",
      },
    ],
    markDefs: [],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <Typography>HighlightedText Component Demo</Typography>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Main Slogan Example (Title2):
            </h2>
            <HighlightedText
              value={mockHighlightedContent}
              variant="title2"
              className="text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
