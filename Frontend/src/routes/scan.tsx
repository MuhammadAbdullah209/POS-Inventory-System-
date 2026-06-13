import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";
import { ScanLine } from "lucide-react";

export const Route = createFileRoute("/scan")({
  head: () => ({ meta: [{ title: "Scan — Inventory" }] }),
  component: ScanPage,
});

interface SearchResult {
  type: "Product" | "Variant";
  product?: string;
  productName?: string;
  variant?: { size: string; color: string; stock: number; barcode: string };
  variants?: { size: string; color: string; stock: number; barcode: string }[];
}

function ScanPage() {
  const [code, setCode] = useState("");
  const [res, setRes] = useState<SearchResult | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setRes(null);
    try { setRes(await api<SearchResult>(`/Api/search/${encodeURIComponent(code)}`)); }
    catch (e) { setErr((e as Error).message); }
  }

  return (
    <AppShell>
      <PageHeader title="Scan / Lookup" description="Find a product or a specific variant by code." />
      <form onSubmit={search} className="flex gap-2 max-w-xl">
        <div className="relative flex-1">
          <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input className="pl-9 font-mono" placeholder="Enter product code or barcode" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <Button type="submit">Search</Button>
      </form>
      {err && <p className="text-sm text-destructive mt-4">{err}</p>}
      {res && (
        <Card className="mt-6 max-w-2xl">
          <CardContent className="p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{res.type}</div>
            <h3 className="text-xl font-semibold mt-1">{res.product ?? res.productName}</h3>
            {res.variant && (
              <div className="mt-4 rounded-md border border-border p-3 text-sm">
                <div className="flex justify-between">
                  <span>{res.variant.size} · {res.variant.color}</span>
                  <span className={res.variant.stock <= 5 ? "text-destructive font-medium" : "font-medium"}>{res.variant.stock} in stock</span>
                </div>
                <div className="font-mono text-xs text-muted-foreground mt-1">{res.variant.barcode}</div>
              </div>
            )}
            {res.variants && (
              <div className="mt-4 grid sm:grid-cols-2 gap-2">
                {res.variants.map((v) => (
                  <div key={v.barcode} className="rounded-md border border-border p-3 text-sm">
                    <div className="flex justify-between">
                      <span>{v.size} · {v.color}</span>
                      <span className={v.stock <= 5 ? "text-destructive" : "text-muted-foreground"}>{v.stock}</span>
                    </div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">{v.barcode}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}