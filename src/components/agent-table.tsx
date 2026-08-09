import { RiskValue, StatusLabel } from "@/components/status";
import type { Agent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function AgentTable({
  data,
  onSelect,
  selectedId,
}: {
  data: Agent[];
  onSelect: (a: Agent) => void;
  selectedId?: string | undefined;
}) {
  return (
    <div className="w-full overflow-x-auto">
    <table className="w-full min-w-[760px] border-collapse text-left">

      <thead>
        <tr className="border-y border-border bg-secondary/50">
          {["Agent", "Type", "Status", "Risk", "Last Activity", "Tool Calls", "Trust"].map((h, i) => (
            <th
              key={h}
              className={cn(
                "label-xs px-5 py-2.5 font-normal",
                i > 2 && "text-right",
                i === 4 && "text-right",
              )}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((a) => (
          <tr
            key={a.id}
            onClick={() => onSelect(a)}
            className={cn(
              "cursor-pointer border-b border-border/70 transition-colors last:border-0 hover:bg-secondary/60",
              selectedId === a.id && "bg-highlight/25",
            )}
          >
            <td className="px-5 py-3">
              <div className="text-[13px] text-foreground">{a.name}</div>
              <div className="font-mono text-[10.5px] text-muted-foreground">{a.id}</div>
            </td>
            <td className="px-5 py-3 text-[12.5px] text-muted-foreground">{a.type}</td>
            <td className="px-5 py-3">
              <StatusLabel status={a.status} />
            </td>

            <td className="px-5 py-3 text-right">
              <RiskValue value={a.risk} />
            </td>
            <td className="tabular px-5 py-3 text-right text-[12.5px] text-muted-foreground">
              {a.lastActivity}
            </td>
            <td className="tabular px-5 py-3 text-right text-[12.5px] text-foreground">
              {a.toolCalls}
            </td>
            <td className="px-5 py-3">
              <div className="flex items-center justify-end gap-2">
                <div className="h-1 w-14 rounded-full bg-secondary">
                  <div
                    className={cn(
                      "h-1 rounded-full",
                      a.trust >= 85 ? "bg-healthy" : a.trust >= 60 ? "bg-suspicious" : "bg-critical",
                    )}
                    style={{ width: `${a.trust}%` }}
                  />
                </div>
                <span className="tabular w-8 text-right text-[12.5px] text-muted-foreground">
                  {a.trust}%
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );

}
