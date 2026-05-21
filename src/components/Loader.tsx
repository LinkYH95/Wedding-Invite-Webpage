import "./Loader.css";

type RsvpLoaderMode = "fetching" | "saving" | "admin_fetching";

type RsvpLoaderProps = {
  mode: RsvpLoaderMode;
};

const loaderContent = {
  fetching: {
    title: "Loading your RSVP details",
    description: "Please wait while we retrieve your invitation details.",
  },
  saving: {
    title: "Saving your RSVP",
    description: "Please do not close or refresh this page.",
  },
  admin_fetching: {
    title: "Fetching data",
    description: " ",
  },
};

export default function RsvpLoader({ mode }: RsvpLoaderProps) {
  const content = loaderContent[mode];

  return (
    <div className="rsvp-step rsvp-step--loading" role="status" aria-live="polite">
      <div className="rsvp-loader-card">
        <div className="rsvp-loader-spinner" />

        <div className="rsvp-loader-text">
          <h2>{content.title || 'title'}</h2>
          <p>{content.description || 'description'}</p>
        </div>
      </div>
    </div>
  );
}