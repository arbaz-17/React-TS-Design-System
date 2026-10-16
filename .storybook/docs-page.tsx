
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";

export function DocsPage() {
  return (
    <main className="ds-docs-page">
      <header className="ds-docs-intro">
        <div className="ds-docs-intro-top">
          <span className="ds-docs-eyebrow">
            Component reference
          </span>
        </div>

        <div className="ds-docs-heading">
          <Title />
          <Subtitle />
          <Description />
        </div>
      </header>

      <section
        className="ds-docs-section"
        aria-labelledby="ds-docs-preview-heading"
      >
        <div className="ds-docs-section-heading">

          <div>
            <h2 id="ds-docs-preview-heading">
              Preview
            </h2>

            <p>
              Explore the component and inspect
              its implementation.
            </p>
          </div>
        </div>

        <Primary />
      </section>

      <section
        className="ds-docs-section"
        aria-labelledby="ds-docs-controls-heading"
      >
        <div className="ds-docs-section-heading">

          <div>
            <h2 id="ds-docs-controls-heading">
              Props and Controls
            </h2>

            <p>
              Review the component's documented
              properties and supported options.
            </p>
          </div>
        </div>

        <Controls />
      </section>

      <section
        className="ds-docs-section ds-docs-examples"
        aria-label="Additional component examples"
      >
        <Stories
          title="Additional examples"
          includePrimary={false}
        />
      </section>
    </main>
  );
}
