import { NextResponse } from "next/server";

const caseData = {
  id: "H1",
  title: "The Expensive Lead Board Problem",
  level: "HEAD OF DIGITAL MARKETING",
  brief:
    "CPL meningkat dari Rp48.000 menjadi Rp137.000 dalam 18 bulan. CEO meminta CPL dipotong 50% dalam 60 hari. Monthly media budget saat ini Rp750 juta.",
  question:
    "Berikan diagnosis untuk board, tentukan aturan untuk allowable acquisition cost, dan susun rencana 60 hari.",
  credits: 5,
  files: [
    { id: "funnel", title: "Downstream Funnel Review", category: "FUNNEL DATA" },
    { id: "economics", title: "Contract Value & Cost Notes", category: "UNIT ECONOMICS" },
    { id: "capacity", title: "Sales Capacity Memo", category: "OPERATIONS" },
    { id: "definition", title: "Lead Definition Change Log", category: "MEASUREMENT" },
    { id: "cohort", title: "Returning Prospect Cohort", category: "CRM DATA" },
    { id: "attribution", title: "Incrementality Audit Status", category: "ATTRIBUTION" },
  ],
};

const fileContents: Record<string, string> = {
  funnel:
    "Downstream funnel conversion meningkat pada setiap stage selama periode yang sama.",
  economics:
    "Average contract value naik. Namun financing cost dan commission juga meningkat.",
  capacity:
    "Sales team hampir mencapai kapasitas penuh dan response time mulai memburuk.",
  definition:
    "Definisi lead berubah dari form submission menjadi gabungan form submission dan messaging conversation.",
  cohort:
    "Sebagian sales berasal dari returning prospects yang sudah berada di database lama.",
  attribution:
    "Attribution incrementality belum bersih. Belum ada pemisahan yang kuat antara demand incremental dan demand yang sudah ada.",
};

export async function GET() {
  return NextResponse.json({ case: caseData });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    action?: string;
    fileId?: string;
  };

  if (body.action === "open_file" && body.fileId) {
    const content = fileContents[body.fileId];
    if (!content) {
      return NextResponse.json({ error: "Berkas tidak tersedia." }, { status: 404 });
    }
    return NextResponse.json({ content });
  }

  if (body.action === "submit") {
    return NextResponse.json({
      shock:
        "CEO tetap bersikeras menjadikan CPL sebagai KPI bonus tim. Apa respons Anda dan KPI alternatif apa yang akan digunakan?",
    });
  }

  return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
}
