
import { useRef, useState } from "react";

import { Button } from "./components/primitives/button";
import { Input } from "./components/primitives/input";

export function InputVerification() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("invalid-email");
  const [showError, setShowError] = useState(false);
  const [capturedValue, setCapturedValue] = useState("");
  const [refFocused, setRefFocused] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section
      aria-labelledby="input-verification-heading"
      className="space-y-8 rounded-surface border border-border bg-card p-5 text-card-foreground shadow-surface sm:p-6"
    >
      <header className="space-y-2">
        <h2
          id="input-verification-heading"
          className="text-xl font-semibold"
        >
          Input Verification
        </h2>

        <p className="text-sm text-muted-foreground">
          Controlled and uncontrolled values, native
          states, validation, and ref forwarding.
        </p>
      </header>

      {/* Controlled input */}
      <div className="space-y-2">
        <label
          htmlFor="test-controlled"
          className="block text-sm font-medium"
        >
          Controlled Input
        </label>

        <Input
          id="test-controlled"
          name="displayName"
          value={name}
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
          placeholder="Enter your name"
        />

        <p className="text-sm text-muted-foreground">
          React state: {name || "(empty)"}
        </p>
      </div>

      {/* Uncontrolled input */}
      <div className="space-y-3">
        <label
          htmlFor="test-uncontrolled"
          className="block text-sm font-medium"
        >
          Uncontrolled Input
        </label>

        <Input
          id="test-uncontrolled"
          name="uncontrolledName"
          defaultValue="Alex"
          ref={inputRef}
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const element = inputRef.current;

            setCapturedValue(element?.value ?? "");

            element?.focus();

            setRefFocused(
              document.activeElement === element,
            );
          }}
        >
          Read value and focus using ref
        </Button>

        <p className="text-sm text-muted-foreground">
          Captured value: {capturedValue || "(not read)"}
        </p>

        <p className="text-sm text-muted-foreground">
          Ref focus test: {refFocused ? "Passed" : "Not tested"}
        </p>
      </div>

      {/* Native form integration */}
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitCount((count) => count + 1);
        }}
      >
        <label
          htmlFor="test-email"
          className="block text-sm font-medium"
        >
          Email address
        </label>

        <Input
          id="test-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
          aria-invalid={showError}
          aria-describedby={
            showError ? "test-email-error" : "test-email-help"
          }
        />

        {showError ? (
          <p
            id="test-email-error"
            className="text-sm text-destructive"
          >
            Example validation error: Please enter
            a valid email address.
          </p>
        ) : (
          <p
            id="test-email-help"
            className="text-sm text-muted-foreground"
          >
            This field uses native email validation.
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

        <Button type="submit">
          Test form submission
        </Button>

        <p role="status" className="text-sm text-muted-foreground">
          Successful submissions: {submitCount}
        </p>
      </form>

      {/* Native input states */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="test-disabled"
            className="block text-sm font-medium"
          >
            Disabled
          </label>

          <Input
            id="test-disabled"
            defaultValue="Unavailable"
            disabled
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="test-readonly"
            className="block text-sm font-medium"
          >
            Read-only
          </label>

          <Input
            id="test-readonly"
            defaultValue="Copy this value"
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="test-password"
            className="block text-sm font-medium"
          >
            Password
          </label>

          <Input
            id="test-password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter password"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="test-number"
            className="block text-sm font-medium"
          >
            Quantity
          </label>

          <Input
            id="test-number"
            type="number"
            min={0}
            step={1}
            defaultValue={5}
          />
        </div>
      </div>
    </section>
  );
}
