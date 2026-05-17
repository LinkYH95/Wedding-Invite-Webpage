import { useNavigate } from "react-router-dom";

export default function CodeInputField({ error, code, setCode, handleCodeSubmit }: any) {
  const navigate = useNavigate();

  return (
    <div className="rsvp-step rsvp-step--code">
      <p className="rsvp-instruction">
        Enter the invitation code found on your wedding invitation.
      </p>

      <div className="rsvp-field">
        <input
          className={`rsvp-input rsvp-input--code ${error ? "rsvp-input--error" : ""}`}
          type="text"
          placeholder="enter invitation code"
          value={code}
          maxLength={10}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && handleCodeSubmit()}
        />
        {error && <p className="rsvp-error">{error}</p>}
      </div>

      <button className="rsvp-submit" onClick={handleCodeSubmit}>
        <h3 className="button-text-dark">Continue</h3>
      </button>

      <button className="rsvp-cancel" onClick={() => navigate("/")}>
        <h3 className="button-text-light">Back</h3>
      </button>
    </div>
  )
}