/* ── import styles ──────────────────────────────────────────────── */
import "./RsvpPage.css";
/* ── import external libraries ──────────────────────────────────── */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
/* ── import internal components ─────────────────────────────────── */
import CollapsibleSection from "./Collapsible/Collapsible";
/* ── import context / hooks ─────────────────────────────────────── */
import { useImageModal } from "../../components/ImageModalContext";
/* ── import utils ───────────────────────────────────────────────── */
import { testSaveRSVP } from "../../utils/testRsvpService";
/* ── import assets ──────────────────────────────────────────────── */
import hero1 from "../../assets/DSC_2754.png"
import weddingMenu from "../../assets/Wedding-Menu.png"
import CodeInputField from "./InvitationCodeInput/InvitationCodeInput";
import AdminField from "./Collapsible/AdminField";


/* ── Types ──────────────────────────────────────────────────────── */
type Step = "code" | "form" | "";
type AdminFieldProp = {
  guestID?: string,
  guestName?: string,
  attending?: boolean,
  menuSelection?: string | null,
  coldStarter?: string | null,
  hotAppetizer?: string | null,
  soup?: string | null,
  mains?: string | null,
  dessert?: string | null,
  dietaryRestriction?: string,
  submitted?: boolean,
  submittedAt?: Date | null,
  updatedAt?: Date | null,
}

export default function RSVPPage() {
  /* ── Constant ─────────────────────────────────────────────────── */
  const inviteDetails = {
    groupName: "Chian Tzoo Jing's Family",
    memberCode: ["CTJ001", "CTJ002", "CTJ003", "CTJ004", "CTJ005"]
  }

  const initialRsvps = {
    CTJ001: {
      guestID: 'CTJ001',
      guestName: 'Chian Tzoo Jing',
      attending: 'yes',
      menuSelection: 'adult-5-course',
      coldStarter: 'cold-starter-1',
      hotAppetizer: 'hot-appetizer-1',
      soup: 'soup-1',
      mains: 'mains-2',
      dessert: 'dessert-2',
      dietaryRestriction: `Less salt, less oil, I'm watching my cholesterol`,
      submitted: false,
    },
    CTJ002: {
      guestID: 'CTJ002',
      guestName: 'Ng Bee Choo',
      attending: 'no',
      menuSelection: null,
      coldStarter: null,
      hotAppetizer: null,
      soup: null,
      mains: null,
      dessert: null,
      dietaryRestriction: '',
      submitted: false,
    },
    CTJ003: {
      guestID: 'CTJ003',
      guestName: 'Chian Jie Wei',
      attending: 'yes',
      menuSelection: 'child-4-course',
      coldStarter: null,
      hotAppetizer: null,
      soup: null,
      mains: null,
      dessert: null,
      dietaryRestriction: `I'm alergic to garlic`,
      submitted: false,
    },
    CTJ004: {
      guestID: 'CTJ004',
      guestName: 'Chian Yao Hui',
      attending: 'yes',
      menuSelection: null,
      coldStarter: null,
      hotAppetizer: null,
      soup: null,
      mains: null,
      dessert: null,
      dietaryRestriction: ``,
      submitted: false,
    },
  }

  const [rsvps, setRsvp] = useState(initialRsvps)

  const defaultData = {
    guestID: '',
    guestName: '',
    attending: true,
    menuSelection: null,
    coldStarter: null,
    hotAppetizer: null,
    soup: null,
    mains: null,
    dessert: null,
    dietaryRestriction: '',
    submitted: false,
  }

  const getMemberArray = () => {
    const arr: any = [];
    Object.keys(rsvps).forEach((key) => {
      arr.push({ key: key, ...(rsvps as any)[key] })
    })
    return arr;
  } 

  const updateGuestDetails = (guestID: string, field: string, value: any) => {
    setRsvp((prev: any) => ({
      ...prev,
      [guestID]: {
        ...prev[guestID],
        [field]: value
      }
    }))
  }

  const setUpdateInput = (object: any) => {
    const result = {[object.guestID]: object}
    updateInput((prev: any) => ({
      ...prev,
      ...result 
    }));
    updatetemp(defaultData)
  }

  /* ── Hooks ────────────────────────────────────────────────────── */
  const navigate = useNavigate();
  const { openImage } = useImageModal()
  const [step, setStep] = useState<Step>("code");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  // const [householdData, setHouseholdData] = useState<any>({ isAdmin: false }); // replace any with your household type
  const [inputs, updateInput]: any = useState({})
  const [temp, updatetemp]: any = useState(defaultData)

  // ── Replace this with your actual Firebase lookup ────────────
  const handleCodeSubmit = async () => {
    setError("");
    console.log('1')
    if (!code.trim()) {
      setError("Please enter your invitation code.");
      return; 
    }

    try {
      // TODO: query Firebase for the household matching this code
      // const snapshot = await getDoc(doc(db, "households", code.trim().toUpperCase()));
      // if (!snapshot.exists()) throw new Error("Invalid code");
      // setHouseholdData(snapshot.data());

      // Placeholder — remove when Firebase is wired up
      if (code.trim().toUpperCase() === "ADMIN") {
        setAdmin(true);
        setStep("")
      } else if (code.trim().toUpperCase() === "TEST01") {
        setAdmin(false)
        setStep("form");
      } else {
        setAdmin(false)
        setError("Invalid invitation code. Please check and try again.");
      }
    } catch (e) {
      setError("Invalid invitation code. Please check and try again.");
    }
  };

  console.log({ step, code, error, isAdmin, inputs })
    return (
    <div className="rsvp-page">
      {/* Blurred background image */}
      <div className="rsvp-bg" style={{ backgroundImage: `url(${hero1})` }}/>

      {/* Scrollable middle column */}
      <div className="rsvp-scroll-area" style={{ alignItems: 'center' }}>
        <div className="rsvp-card">

          {/* Back to home */}
          {step !== "code" && (
            <button className="rsvp-back" onClick={() => { setStep('code'); setAdmin(false) }}>
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

          {/* Step: Code Entry */}
          {step === "code" && (
            <CodeInputField
              error={error}
              code={code}
              setCode={(e: any) => setCode(e)}
              handleCodeSubmit={() => handleCodeSubmit()}
            />
          )}

          {/* Step: admin */}
          {isAdmin && (
            <AdminField />
          )}

          {/* Step: Household Form */}
          {step === 'form' && (
            <div className="rsvp-step rsvp-step--form">
              <p className="rsvp-instruction">
                Welcome
                <br/><strong style={{ fontSize: "1.25rem" }}>{inviteDetails.groupName}</strong>!
                <br/>Please fill in the details below and select the dinner menu for your household. Please note that if nothing is selected, we will choose the default menu for you.
                <br/><a onClick={() => openImage(weddingMenu)}>link</a>
              </p>

              {getMemberArray().map((props: any) => (
                <CollapsibleSection {...props} onchange={(field: any, value: any) => updateGuestDetails(props.guestID, field, value)} key={`Collapsible-field-${props.key}`}/>
              ))}

              {/*
                ── BUILD YOUR FORM HERE ──────────────────────────────
                householdData contains the data loaded from Firebase.
                Map over householdData.members to render per-person fields.
                Example structure below — replace with your real fields.
              */}

              {/* {householdData.members.map((member: string, i: number) => ( */}

              {/* Submit */}
              <button className="rsvp-submit" onClick={() => {
                // TODO: write to Firebase here
                alert("RSVP submitted! Thank you.");
              }}>
                <h3 className="button-text-dark">Submit RSVP</h3>
              </button>
            </div>
          )}


          

        </div>
      </div>
    </div>
  );
}


      //   <div className="rsvp-card">

      //     {/* Back to home */}
      //     {step !== "code" && (
      //       <button className="rsvp-back" onClick={() => { setStep('code'); setHouseholdData({ isAdmin: false }) }}>
      //         ← Back
      //       </button>
      //     )}

      //     {/* Header */}
      //     <div className="rsvp-header">
      //       <p className="rsvp-eyebrow">You're invited</p>
      //       <h1 className="rsvp-title">RSVP</h1>
      //       <p className="rsvp-subtitle">Thursday, October 25, 2026</p>
      //     </div>

      //     {/* Divider */}
      //     <div className="rsvp-divider" />

      //     {/* Step: Code Entry */}
      //     {step === "code" && (
      //       <div className="rsvp-step rsvp-step--code">
      //         <p className="rsvp-instruction">
      //           Enter the invitation code found on your wedding invitation.
      //         </p>

      //         <div className="rsvp-field">
      //           <input
      //             className={`rsvp-input rsvp-input--code ${error ? "rsvp-input--error" : ""}`}
      //             type="text"
      //             placeholder="enter invitation code"
      //             value={code}
      //             maxLength={10}
      //             onChange={(e) => setCode(e.target.value.toUpperCase())}
      //             onKeyDown={(e) => e.key === "Enter" && handleCodeSubmit()}
      //           />
      //           {error && <p className="rsvp-error">{error}</p>}
      //         </div>

      //         <button className="rsvp-submit" onClick={handleCodeSubmit}>
      //           <h3 className="button-text-dark">Continue</h3>
      //         </button>

      //         <button className="rsvp-cancel" onClick={() => navigate("/")}>
      //           <h3 className="button-text-light">Back</h3>
      //         </button>
      //       </div>
      //     )}

      //     {/* Step: Household Form */}
      //     {step === 'form'}
      //     {/* {householdData.isAdmin && (
      //     )} */}

      //     {step === "form" && householdData && (
      //       <div className="rsvp-step rsvp-step--form">
      //         <p className="rsvp-instruction">
      //           Welcome
      //           <br/><strong style={{ fontSize: "1.25rem" }}>{inviteDetails.groupName}</strong>!
      //           <br/>Please fill in the details below and select the dinner menu for your household. Please note that if nothing is selected, we will choose the default menu for you.
      //           <br/><a onClick={() => openImage(weddingMenu)}>link</a>
      //         </p>

      //         {householdData.members.map((memberData: string, i: number) => (
      //           <CollapsibleSection obj={memberData} key={`Collapsible-field-${i}`}/>
      //         ))}

      //         {/*
      //           ── BUILD YOUR FORM HERE ──────────────────────────────
      //           householdData contains the data loaded from Firebase.
      //           Map over householdData.members to render per-person fields.
      //           Example structure below — replace with your real fields.
      //         */}

      //         {/* {householdData.members.map((member: string, i: number) => ( */}

      //         {/* Submit */}
      //         <button className="rsvp-submit" onClick={() => {
      //           // TODO: write to Firebase here
      //           alert("RSVP submitted! Thank you.");
      //         }}>
      //           <h3 className="button-text-dark">Submit RSVP</h3>
      //         </button>
      //       </div>
      //     )}

      //   </div>
      // </div>

      // {step === "form" && householdData && (
      //       <div className="rsvp-step rsvp-step--form">
      //         <p className="rsvp-instruction">
      //           Welcome
      //           <br/><strong style={{ fontSize: "1.25rem" }}>{inviteDetails.groupName}</strong>!
      //           <br/>Please fill in the details below and select the dinner menu for your household. Please note that if nothing is selected, we will choose the default menu for you.
      //           <br/><a onClick={() => openImage(weddingMenu)}>link</a>
      //         </p>

      //         {householdData.members.map((memberData: string, i: number) => (
      //           <CollapsibleSection obj={memberData} key={`Collapsible-field-${i}`}/>
      //         ))}

      //         {/*
      //           ── BUILD YOUR FORM HERE ──────────────────────────────
      //           householdData contains the data loaded from Firebase.
      //           Map over householdData.members to render per-person fields.
      //           Example structure below — replace with your real fields.
      //         */}

      //         {/* {householdData.members.map((member: string, i: number) => ( */}

      //         {/* Submit */}
      //         <button className="rsvp-submit" onClick={() => {
      //           // TODO: write to Firebase here
      //           alert("RSVP submitted! Thank you.");
      //         }}>
      //           <h3 className="button-text-dark">Submit RSVP</h3>
      //         </button>
      //       </div>
      //     )}