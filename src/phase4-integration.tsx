
import { useState } from "react";

import {
  Badge,
  Button,
  Checkbox,
  Input,
  Textarea,
} from "./components";

export function Phase4Integration() {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      aria-labelledby="phase4-review-title"
      className="space-y-6 rounded-surface border border-border bg-card p-6 text-card-foreground shadow-surface"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="phase4-review-title"
          className="text-xl font-semibold"
        >
          Phase 4 Integration Test
        </h2>

        <Badge
          variant={submitted ? "success" : "neutral"}
        >
          {submitted ? "Submitted" : "Not Submitted"}
        </Badge>
      </div>

      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="space-y-2">
          <label
            htmlFor="review-email"
            className="block text-sm font-medium"
          >
            Email address
          </label>

          <Input
            id="review-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
              setSubmitted(false);
            }}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="review-notes"
            className="block text-sm font-medium"
          >
            Feedback
          </label>

          <Textarea
            id="review-notes"
            name="notes"
            value={notes}
            onChange={(event) => {
              setNotes(event.currentTarget.value);
              setSubmitted(false);
            }}
            rows={4}
            minLength={10}
            required
            aria-describedby="review-notes-help"
            placeholder="Share your feedback..."
          />

          <p
            id="review-notes-help"
            className="text-sm text-muted-foreground"
          >
            Enter at least 10 characters.
          </p>
        </div>

        <label className="flex min-h-11 items-center gap-3">
          <Checkbox
            name="agreement"
            value="yes"
            checked={agreed}
            onChange={(event) => {
              setAgreed(event.currentTarget.checked);
              setSubmitted(false);
            }}
            required
          />

          <span className="text-sm">
            I agree to submit this test form.
          </span>
        </label>

        <Button type="submit">
          Submit Feedback
        </Button>

        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          {submitted
            ? "Form submitted successfully."
            : ""}
        </p>
      </form>
    </section>
  );
}
