import "./Loader.css";
import { useTranslation } from "react-i18next";

type RsvpLoaderMode = "fetching" | "saving" | "admin_fetching";

type RsvpLoaderProps = {
  mode: RsvpLoaderMode;
};

export default function RsvpLoader({ mode }: RsvpLoaderProps) {
  const { t } = useTranslation();

  const loaderContent = {
    fetching: {
      title: t("loading.fetch_title"),
      description: t("loading.fetch_desc"),
    },
    saving: {
      title: t("loading.save_title"),
      description: t("loading.save_desc"),
    },
    admin_fetching: {
      title: t("loading.admin_title"),
      description: t("loading.admin_desc"),
    },
  };

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