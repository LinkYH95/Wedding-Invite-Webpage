/* ── import styles ──────────────────────────────────────────────── */
import "./RsvpPage.css";
/* ── import external libraries ──────────────────────────────────── */
import { useState } from "react";
/* ── import internal components ─────────────────────────────────── */
import CollapsibleSection from "./Collapsible/Collapsible";
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
import CodeInputField from "./InvitationCodeInput/InvitationCodeInput";


/* ── Types ──────────────────────────────────────────────────────── */
type Step = "code" | "form" | "admin" | "fetching" | "saving" | "";

export default function RSVPPage() {
  /* ── Constant ─────────────────────────────────────────────────── */
  const { openImage } = useImageModal()
  const [step, setStep] = useState<Step>("code");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [inviteDetails, setInviteDetails] = useState<any>(null);


  /* ── Hooks ────────────────────────────────────────────────────── */
  const handleCodeSubmit = async () => {
    setError("");

    const trimmedCode = code.trim().toUpperCase();

    if (!trimmedCode) {
      setError("Please enter your invitation code.");
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
      setError("Invalid invitation code. Please check and try again.");
      setStep("code");
    }
  };

  const handleSubmitRSVP = async () => {
    setError("");

    if (!inviteDetails?.rsvps) {
      setError("No RSVP details found. Please reload your invitation.");
      return;
    }

    try {
      setStep("saving");

      await batchSaveRSVP(inviteDetails.rsvps);

      setStep("code");
    } catch (error) {
      console.error("Failed to submit RSVP:", error);

      setError("Failed to submit RSVP. Please try again.");
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
              Welcome,&nbsp;&nbsp;
              <strong style={{ fontSize: "var(--text-xl)",textDecoration: 'underline' }}>{inviteDetails.groupName}</strong> <strong style={{ fontSize: "var(--text-xl)" }}>!</strong>
              <br/>Please fill in the details below and select the dinner menu for your household. Please note that if nothing is selected, we will choose the default menu for you.
              <br/><a className="text-hyperlink" onClick={() => openImage(weddingMenu)}>View menu</a>
            </p>

            {inviteDetails.memberCodes.map((guestID: string) => {
              const guestDetails = inviteDetails.rsvps[guestID];

              if (!guestDetails) return null;
              return (
                <CollapsibleSection {...guestDetails} onchange={(field: any, value: any) => updateGuestDetails(guestID, field, value)} key={`Collapsible-field-${guestDetails.key}`}/>
              );
            })}

            {/* Submit */}
            <button className="rsvp-submit" onClick={() => handleSubmitRSVP()}>
              <h3 className="button-text-dark">Submit RSVP</h3>
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

          {/* Header */}
          <div className="rsvp-header">
            <p className="rsvp-eyebrow">You're invited</p>
            <h1 className="rsvp-title">RSVP</h1>
            <p className="rsvp-subtitle">Thursday, October 25, 2026</p>
          </div>

          {/* Divider */}
          <div className="rsvp-divider" />

          {renderContent()}

        </div>
      </div>
    </div>
  );
}