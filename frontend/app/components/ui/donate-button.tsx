type DonateButtonProps = {
    url: string,
    text: string
}

export default function DonateButton({
    url,
    text
}: DonateButtonProps) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "12px 20px",
          backgroundColor: "#0070ba",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        {
            text
        }
      </a>
    );
  }