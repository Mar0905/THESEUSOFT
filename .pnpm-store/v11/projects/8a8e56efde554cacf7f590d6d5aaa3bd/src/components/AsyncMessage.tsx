type Props = { kind: "error" | "empty"; children: React.ReactNode }
export default function AsyncMessage({ kind, children }: Props) {
  return <p role={kind === "error" ? "alert" : "status"} className="rounded-lg p-3 text-sm" style={{ color: kind === "error" ? "#FCA5A5" : "#9CA3AF", background: kind === "error" ? "rgba(239,68,68,.12)" : "rgba(255,255,255,.04)" }}>{children}</p>
}
