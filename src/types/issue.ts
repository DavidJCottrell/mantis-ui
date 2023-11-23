export interface Issue {
  id: number;
  nextNodeId: number | null;
  previousNodeId: number;
  reviewerId: number | null;
  condition: "active" | "block" | "hold";
  title: string;
  repo: string;
  status: "open" | "development" | "review" | "merged";
  priority: "low" | "medium" | "high";
  tags: [];
  nodePosition: {
    x: number;
    y: number;
  };
}
