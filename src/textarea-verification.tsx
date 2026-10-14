
import { useRef, useState } from "react";

import { Button } from "./components/primitives/button";
import { Textarea } from "./components/primitives/textarea";

export function TextareaVerification() {
  const [description, setDescription] = useState("");
  const [showError, setShowError] = useState(false);
  const [capturedValue, setCapturedValue] = useState("");
  const [refFocused, setRefFocused] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [submittedText, setSubmittedText] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <section
      aria-labelledby="textarea-verification-heading"
      className="space-y-8 rounded-surface border border-border bg-card p-5 text-card-foreground shadow-surface sm:p-6"
    >
      <header className="space-y-2">
        <h2
          id="textarea-verification-heading"
          className="text-xl font-semibold"
        >
          Textarea Verification
        </h2>

        <p className="text-sm text-muted-foreground">
          Multiline editing, resizing, controlled and
          uncontrolled values, validation, and refs.
        </p>
      </header>

      {/* Controlled textarea */}
      <div className="space-y-2">
        <label
          htmlFor="test-controlled-textarea"
          className="block text-sm font-medium"
        >
          Controlled Description
        </label>

        <Textarea
          id="test-controlled-textarea"
          name="description"
          value={description}
          onChange={(event) => {
            setDescription(event.currentTarget.value);
          }}
          placeholder="Describe your project..."
        />

        <p className="text-sm text-muted-foreground">
          Characters: {description.length}
          {" · "}
          Lines: {description.split("\n").length}
        </p>
      </div>

      {/* Uncontrolled textarea */}
      <div className="space-y-3">
        <label
          htmlFor="test-uncontrolled-textarea"
          className="block text-sm font-medium"
        >
          Uncontrolled Notes
        </label>

        <Textarea
          id="test-uncontrolled-textarea"
          name="notes"
          defaultValue={"First line\nSecond line"}
          ref={textareaRef}
        />

        <Button
          variant="outline"
          onClick={() => {
            const element = textareaRef.current;

            setCapturedValue(element?.value ?? "");

            element?.focus();

            setRefFocused(
              document.activeElement === element,
            );
          }}
        >
          Read value and focus using ref
        </Button>

        <p className="whitespace-pre-wrap text-sm text-muted-foreground">
          Captured value: {capturedValue || "(not read)"}
        </p>

        <p className="text-sm text-muted-foreground">
          Ref focus: {refFocused ? "Passed" : "Not tested"}
        </p>
      </div>

      {/* Native form integration */}
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();

          const data = new FormData(event.currentTarget);

          setSubmittedText(
            String(data.get("feedback") ?? ""),
          );

          setSubmitCount((count) => count + 1);
        }}
      >
        <label
          htmlFor="test-feedback"
          className="block text-sm font-medium"
        >
          Required Feedback
        </label>

        <Textarea
          id="test-feedback"
          name="feedback"
          rows={3}
          minLength={10}
          maxLength={120}
          required
          placeholder="Enter at least 10 characters..."
        />

        <p className="text-sm text-muted-foreground">
          Required · Minimum 10 characters · Maximum 120
        </p>

        <Button type="submit">
          Submit feedback
        </Button>

        <div
          role="status"
          className="space-y-1 text-sm text-muted-foreground"
        >
          <p>Successful submissions: {submitCount}</p>
          <p className="whitespace-pre-wrap">
            Submitted: {submittedText || "(none)"}
          </p>
        </div>
      </form>

      {/* Invalid state */}
      <div className="space-y-3">
        <label
          htmlFor="test-invalid-textarea"
          className="block text-sm font-medium"
        >
          Validation State
        </label>

        <Textarea
          id="test-invalid-textarea"
          defaultValue="Example content"
          aria-invalid={showError}
          aria-describedby={
            showError
              ? "textarea-error"
              : "textarea-help"
          }
        />

        {showError ? (
          <p
            id="textarea-error"
            className="text-sm text-destructive"
          >
            Example error: Please revise this description.
          </p>
        ) : (
          <p
            id="textarea-help"
            className="text-sm text-muted-foreground"
          >
            This is an example description.
          </p>
        )}

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showError}
            onChange={(event) => {
              setShowError(event.currentTarget.checked);
            }}
          />
          Show invalid state
        </label>
      </div>

      {/* Native states */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="test-disabled-textarea"
            className="block text-sm font-medium"
          >
            Disabled
          </label>

          <Textarea
            id="test-disabled-textarea"
            defaultValue="Unavailable for editing."
            disabled
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="test-readonly-textarea"
            className="block text-sm font-medium"
          >
            Read-only
          </label>

          <Textarea
            id="test-readonly-textarea"
            defaultValue="This content can be selected and copied."
            readOnly
          />
        </div>
      </div>

      {/* Longer content and rows */}
      <div className="space-y-2">
        <label
          htmlFor="test-long-textarea"
          className="block text-sm font-medium"
        >
          Long Content & Resizing
        </label>

        <Textarea
          id="test-long-textarea"
          rows={6}
          defaultValue={
            "This textarea starts with six rows.\n\n" +
            "Try adding several paragraphs of text. " +
            "Long lines should wrap within the control.\n\n" +
            "Drag the bottom-right resize handle downward " +
            "to expand its height."
          }
        />
      </div>
    </section>
  );
}
