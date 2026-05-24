import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CodeInputField({ error, code, setCode, handleCodeSubmit }: any) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="rsvp-step rsvp-step--code">
      <p className="rsvp-instruction">
        {t('rsvp.instruction')}
      </p>

      <div className="rsvp-field">
        <input
          className={`rsvp-input rsvp-input--code ${error ? "rsvp-input--error" : ""}`}
          type="text"
          placeholder={t('rsvp.fieldPlaceholder')}
          value={code}
          maxLength={12}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && handleCodeSubmit()}
        />
        {error && <p className="rsvp-error">{error}</p>}
      </div>

      <button className="rsvp-submit" onClick={handleCodeSubmit}>
        <h3 className="button-text-dark">{t('rsvp.submit')}</h3>
      </button>

      <button className="rsvp-cancel" onClick={() => navigate("/")}>
        <h3 className="button-text-light">{t('rsvp.cancel')}</h3>
      </button>
    </div>
  )
}