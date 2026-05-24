/* ── import styles ──────────────────────────────────────────────── */
import "./RsvpPage.css";
/* ── import external libraries ──────────────────────────────────── */
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom'
/* ── import internal components ─────────────────────────────────── */
import CollapsibleSection from "./Collapsible/Collapsible";
import { useTranslation } from "react-i18next";
/* ── import Page ────────────────────────────────────────────────── */
import AdminField from "./Collapsible/AdminField";
import { getInviteGroupWithRsvps } from "../../utils/retrieveRsvps";
import { batchSaveRSVP } from "../../utils/testRsvpService";
import RsvpLoader from "../../components/Loader";
/* ── import context / hooks ─────────────────────────────────────── */
import { useImageModal } from "../../components/ImageModalContext";
/* ── import assets ──────────────────────────────────────────────── */
import hero1 from "../../assets/DSC_2754.png"
import weddingMenu from "../../assets/Wedding-Menu.png"
import weddingMenuChild from "../../assets/Wedding-Menu-Child.png"
import CodeInputField from "./InvitationCodeInput/InvitationCodeInput";


/* ── Types ──────────────────────────────────────────────────────── */
type Step = "code" | "form" | "admin" | "fetching" | "saving" | "";

export default function RSVPPage() {
  /* ── Constant ─────────────────────────────────────────────────── */
  const { openImage } = useImageModal()
  const [step, setStep] = useState<Step>("code");
  const [searchParams] = useSearchParams()
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [inviteDetails, setInviteDetails] = useState<any>(null);

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  /* ── Hooks ────────────────────────────────────────────────────── */
  useEffect(() => {
    const codeFromUrl = searchParams.get('code')
    const lanFromUrl = searchParams.get('zh')
    if (lanFromUrl === 'zh') {
      i18n.changeLanguage('zh')
    }
    if (codeFromUrl) {
      setCode(codeFromUrl);
      handleCodeSubmit(codeFromUrl);
    }
  }, [])

  const handleCodeSubmit = async (overrideCode?: string) => {
    setError("");

    const trimmedCode = (overrideCode ?? code).trim().toUpperCase();

    if (!trimmedCode) {
      setError(t('rsvp.error_blank_code'));
      return;
    }

    if (trimmedCode === "ADMIN") {
      setStep("admin");
      return;
    }

    try {
      setStep("fetching");

      const result = await getInviteGroupWithRsvps(trimmedCode);

      setInviteDetails(result);
      setStep("form");
    } catch (e) {
      console.error(e);

      setInviteDetails(null);
      setError(t('rsvp.error_invalid_code'));
      setStep("code");
    }
  };

  const handleSubmitRSVP = async () => {
    setError("");

    if (!inviteDetails?.rsvps) {
      setError(t('rsvp.error_no_details'));
      return;
    }

    try {
      setStep("saving");

      await batchSaveRSVP(inviteDetails.rsvps);

      setStep("code");
    } catch (error) {
      console.error("Failed to submit RSVP:", error);

      setError(t('rsvp.error_submit_fail'));
      setStep("code");
    }
  };

  const updateGuestDetails = (guestID: string, field: string, value: any) => {
    setInviteDetails((prev: any) => {
      if (!prev || !prev.rsvps || !prev.rsvps[guestID]) return prev;

      return {
        ...prev,
        rsvps: {
          ...prev.rsvps,
          [guestID]: {
            ...prev.rsvps[guestID],
            [field]: value
          },
        }
      }
    })
  }

  const renderContent = () => {
    switch (step) {
      case "fetching":
      case "saving":
        return (
          <RsvpLoader mode={step}/>
        )
      case "admin":
        return (
          <AdminField />
        )
      case "form":
        return (
          <div className="rsvp-step rsvp-step--form">
            <p className="rsvp-instruction">
              {t('form.welcome')},&nbsp;&nbsp;
              <strong style={{ fontSize: "var(--text-xl)",textDecoration: 'underline' }}>{inviteDetails.groupName}</strong> <strong style={{ fontSize: "var(--text-xl)" }}>!</strong>
              <br/>{t('form.instruction')}
              <br/><a className="text-hyperlink" onClick={() => openImage(weddingMenu)}>{t('form.menu_adult')}</a> &nbsp;|&nbsp; <a className="text-hyperlink" onClick={() => openImage(weddingMenuChild)}>{t('form.menu_kids')}</a>
            </p>

            {inviteDetails.memberCodes.map((guestID: string) => {
              const guestDetails = inviteDetails.rsvps[guestID];

              if (!guestDetails) return null;
              return (
                <CollapsibleSection {...guestDetails} onchange={(field: any, value: any) => updateGuestDetails(guestID, field, value)} key={`Collapsible-field-${guestDetails.id}`}/>
              );
            })}

            {/* Submit */}
            <button className="rsvp-cancel" onClick={() => handleSubmitRSVP()}>
              <h3 className="button-text-light">{t('form.submit')}</h3>
            </button>
          </div>
        )
      case "code":
      default:
        return (
          <CodeInputField
            error={error}
            code={code}
            setCode={(e: any) => setCode(e)}
            handleCodeSubmit={() => handleCodeSubmit()}
          />
        )
    }
  }

  return (
    <div className="rsvp-page">
      {/* Blurred background image */}
      <div className="rsvp-bg" style={{ backgroundImage: `url(${hero1})` }}/>

      {/* Scrollable middle column */}
      <div className="rsvp-scroll-area" style={{ alignItems: 'center' }}>
        <div className="rsvp-card">

          {/* Back to home */}
          {step !== "code" && (
            <button className="rsvp-back" onClick={() => { setStep('code') }}>
              ← Back
            </button>
          )}

          <button onClick={() => i18n.changeLanguage(isEn ? 'zh' : 'en')} style={{ float: "inline-end" }}>
            {isEn ? '中文' : 'EN'}
          </button>

          {/* Header */}
          <div className="rsvp-header">
            <p className="rsvp-eyebrow">{t('rsvp.eyebrow')}</p>
            <h1 className="rsvp-title">RSVP</h1>
            <p className="rsvp-subtitle">{t('rsvp.subtitle')}</p>
          </div>

          {/* Divider */}
          <div className="rsvp-divider" />

          {renderContent()}

        </div>
      </div>
    </div>
  );
}