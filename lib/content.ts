// All site copy, moved out of design/PEPL Website Orange.dc.html (template + renderVals()).

const pad = (k: number) => String(k + 1).padStart(2, "0");
export const img = (k: string) => `/images/${k}.jpg`;

export const SHOW_PENDING = process.env.NEXT_PUBLIC_SHOW_PENDING !== "0";
export const SHOW_CAREERS = process.env.NEXT_PUBLIC_SHOW_CAREERS === "1";

export const CONTACT = {
  phone: "+91 98797 95382",
  phoneHref: "tel:+919879795382",
  email: "info@parasmaniengineering.com",
  company: "Parasmani Engineering Pvt. Ltd.",
  street: "Village Vani, Taluka Viramgam",
  locality: "Viramgam",
  region: "Gujarat",
  postalCode: "382150",
  district: "Dist. Ahmedabad",
};

export type NavItem = { label: string; href: string };

export const NAV_ALL: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "CAPABILITIES", href: "/capabilities" },
  { label: "INDUSTRIES", href: "/industries" },
  { label: "PROJECTS", href: "/projects" },
  { label: "FACILITY", href: "/facility" },
  { label: "QUALITY", href: "/quality" },
  { label: "TECHNOLOGY", href: "/technology" },
  { label: "CAREERS", href: "/careers" },
  { label: "RDSO", href: "/rdso-approval" },
  { label: "CONTACT", href: "/contact" },
].filter((n) => n.href !== "/careers" || SHOW_CAREERS);

export const ABOUT_SUB = ["/capabilities", "/facility", "/technology", "/quality"];

export const ticker = [
  "HEAVY STRUCTURAL STEEL", "CNC PROFILING", "SUBMERGED ARC WELDING", "NDT & INSPECTION",
  "SHOT BLASTING", "SURFACE TREATMENT", "PRE-ENGINEERED BUILDINGS", "ERECTION AT SITE", "DIGITAL TRACEABILITY",
];

export const metrics = [
  { value: "40,000", unit: "M²", label: "INDUSTRIAL LAND" },
  { value: "6,000", unit: "M²", label: "COVERED AREA" },
  { value: "30", unit: "MT", label: "CRANE CAPACITY" },
  { value: "50 × 10", unit: "M", label: "TWIN-BEAM GANTRY" },
];

export const capHeavy = [
  "Heavy Structural Steel", "Industrial Structures", "Complex Fabricated Assemblies",
  "Columns & Beams", "Trusses", "Platforms", "Structural Components",
  "Heavy Welded Structures", "Project-Specific Fabrication",
];
export const capEng = [
  "Engineering", "Shop Drawings", "Fabrication Drawings", "CNC Data",
  "Quantity Take-Off", "Production Planning", "Quality Documentation",
];

export const processStages = [
  { number: "01", name: "ENGINEERING", hold: "Drawing approval", doc: "Approved engineering / shop drawing", sign: "Engineering sign-off" },
  { number: "02", name: "MATERIAL PROCUREMENT", hold: "Material verification", doc: "Material certificates", sign: "QC sign-off" },
  { number: "03", name: "CNC CUTTING & DRILLING", hold: "Dimensional verification", doc: "CNC program / inspection record", sign: "Production / QC sign-off" },
  { number: "04", name: "FIT-UP", hold: "Fit-up inspection", doc: "Fit-up inspection report", sign: "QC sign-off" },
  { number: "05", name: "WELDING", hold: "Welding inspection", doc: "WPS / PQR / welding record", sign: "Welding / QC sign-off" },
  { number: "06", name: "INSPECTION & NDT", hold: "NDT acceptance", doc: "NDT report", sign: "Inspection sign-off" },
  { number: "07", name: "SHOT BLASTING / PAINTING", hold: "Surface / coating inspection", doc: "Paint inspection report", sign: "QC sign-off" },
  { number: "08", name: "FINAL INSPECTION", hold: "Final acceptance", doc: "Final inspection dossier", sign: "Authorized sign-off" },
  { number: "09", name: "DISPATCH", hold: "Dispatch clearance", doc: "Dispatch documentation", sign: "Project sign-off" },
];

const S_IND = ["D", "M", "G", "E", "L", "H", "A", "N", "C", "K", "F", "J"];
export const industries = [
  ["Power & Energy", "Structural and fabricated steel for thermal, renewable and balance-of-plant packages, produced to the tolerances and documentation regimes power EPCs require."],
  ["Steel & Metals", "Technological structures, conveyor galleries, junction houses and process buildings for integrated steel and metals plants."],
  ["Infrastructure", "Heavy fabricated assemblies for infrastructure programmes, from terminal structures to industrial sheds and support steel."],
  ["Cement", "Structural steel for cement plants — preheater towers, silo structures, chute and duct supports."],
  ["Industrial Manufacturing", "Fabrication for manufacturing plants: building frames, mezzanine floors, machine foundations and equipment supports."],
  ["Railways", "Fabricated components and structures for railway infrastructure, produced under the approval regime the sector requires."],
  ["EPC Projects", "Schedule-driven fabrication packages for EPC contractors, planned against the project's erection sequence rather than shop convenience."],
  ["Defence & Strategic", "Fabricated steel for strategic and defence infrastructure, with the documentation and confidentiality such work demands."],
  ["Heavy Engineering", "Complex built-up assemblies and equipment structures fabricated to customer drawings and inspection plans."],
  ["Oil & Gas", "Pipe racks, process structures, platforms and equipment supports for refineries and oil & gas facilities."],
  ["Solar", "Module mounting structures, inverter and control-room steel for utility-scale solar plants."],
  ["Food Processing", "Hygienic-grade process structures, platforms and equipment supports for food and beverage plants."],
].map(([name, long], k) => ({ num: pad(k), name, long, img: img(S_IND[k]) }));

const S_PRJ = ["A", "G", "L", "B", "E", "X"];
const S_STG = [["S", "P"], ["W", "Y", "AB", "R", "AC"], ["S", "T", "V"], ["B", "I", "D"], ["H", "G", "E"]];
const PSTAGES = ["Engineering", "Fabrication", "Inspection", "Dispatch", "Site"];
const TBC = "To be confirmed";
export const projects = [
  ["Thermal plant structural package", "Power & Energy", "Heavy structural fabrication"],
  ["Pre-engineered warehouse, supply & erection", "Infrastructure", "Fabrication, supply & erection"],
  ["Process plant technological structures", "Industrial Manufacturing", "Heavy fabrication & surface treatment"],
  ["Conveyor gallery & junction house steel", "Steel & Metals", "Fabrication & painting"],
  ["Industrial shed, primary & secondary steel", "EPC Projects", "Fabrication & supply"],
  ["Equipment support structures", "Heavy Engineering", "Built-up assemblies to drawing"],
].map(([title, industry, scope], k) => ({
  num: pad(k), title, industry, scope, img: img(S_PRJ[k]),
  client: TBC, qty: TBC, location: TBC, status: TBC,
  stages: PSTAGES.map((name, j) => ({ name, img: img(S_STG[j][k % S_STG[j].length]) })),
}));

const S_MCH = ["U", "N", "AA", "T", "Y", "W", "Z", "V", "J", "D", "F", "I"];
export const machines = [
  ["CNC Plasma Cutting", "Profile cutting from nested CNC data"],
  ["CNC Drilling", "Beam-line drilling to model coordinates"],
  ["Edge Milling", "Plate edge preparation for weld profiles"],
  ["Band Saw", "Section cutting to length"],
  ["I-Beam Fit-Up & Welding", "Built-up girder assembly"],
  ["ESAB SAW Line", "Submerged arc welding"],
  ["Beam Straightening", "Flange distortion correction"],
  ["Shot Blasting", "Surface preparation to specified grade"],
  ["Painting Bay", "Coating application and curing"],
  ["Gantry Crane", "Twin-beam handling, 50 × 10 m"],
  ["Drying Ovens", "Electrode and SAW flux consumable control"],
  ["Weigh Bridge", "Dispatch weighing and record"],
].map(([name, fn], k) => ({ name, fn, img: img(S_MCH[k]) }));

export const certs = [
  { name: "ISO 9001", status: "Pending verification", evidence: TBC, download: "—" },
  { name: "ISO 45001", status: "Pending verification", evidence: TBC, download: "—" },
  { name: "BIS", status: "As applicable", evidence: "Per product standard", download: "—" },
  { name: "RDSO", status: "As applicable", evidence: "Per railway scope", download: "—" },
  { name: "BHEL approval / registration", status: "As applicable", evidence: "Per power-sector scope", download: "—" },
  { name: "Welding qualifications", status: "Pending verification", evidence: "WPS / PQR register", download: "On request" },
  { name: "NDT capabilities", status: "Pending verification", evidence: "In-house & agency", download: "On request" },
];

export const downloads = [
  { name: "Quality Certificates", meta: "PDF · pending" },
  { name: "Quality Policy", meta: "PDF · 1 page" },
  { name: "HSE Policy", meta: "PDF · 1 page" },
  { name: "Inspection Procedures", meta: "PDF · pending" },
  { name: "Company Profile", meta: "PDF · pending" },
];

export const chain = ["Engineering Model", "Fabrication Drawing", "CNC Data", "Production", "Inspection", "Digital Record"]
  .map((name, k) => ({ num: pad(k), name }));

export const tech = [
  ["CNC Technology", "Plasma profiling and beam-line drilling driven directly by model output."],
  ["3D Modelling", "Detailed models before steel is cut — clashes found on screen, not on site."],
  ["CAD/CAM", "One data chain from detailing to machine, with no manual re-entry."],
  ["Digital Production Planning", "Job-wise plans sequenced against the customer's erection programme."],
  ["Production Monitoring", "Stage-wise progress captured against the plan and reported to the client."],
  ["Quality Traceability", "Heat numbers, welders and inspection records tied to each mark number."],
  ["Digital Documentation", "Dispatch document packs assembled and issued digitally."],
].map(([name, body], k) => ({ num: pad(k), name, body }));

export const why = [
  { title: "ENGINEERING CAPABILITY", description: "Engineering and detailing aligned with production requirements." },
  { title: "MANUFACTURING CAPABILITY", description: "Integrated fabrication infrastructure for demanding projects." },
  { title: "QUALITY COMMITMENT", description: "Controlled processes, inspection and documentation." },
  { title: "PROJECT EXECUTION", description: "Planned execution from engineering through dispatch." },
  { title: "SAFETY FIRST", description: "Safety integrated into operational processes." },
  { title: "CUSTOMER FOCUS", description: "Clear communication and long-term project relationships." },
];

export const values = [
  { name: "INTEGRITY", meaning: "We communicate honestly, document accurately and deliver against commitments." },
  { name: "OWNERSHIP", meaning: "We take responsibility from engineering through delivery." },
  { name: "EXCELLENCE", meaning: "We continuously improve engineering, fabrication and quality standards." },
  { name: "CARE", meaning: "We care about people, safety, quality, customers and long-term relationships." },
];

export const leaders = [
  { role: "CHAIRMAN / CMD", name: "Daxesh Soni" },
  { role: "CEO", name: TBC },
  { role: "PLANT HEAD / CTO", name: "Sanjeev Roy" },
];

export const clientSlots = Array.from({ length: 8 }, () => "LOGO — PERMISSION PENDING");

export const roles = [
  ["Structural Engineer", "Engineering"], ["Production Engineer", "Production"],
  ["Welding Engineer", "Quality / Production"], ["QA/QC Engineer", "Quality"],
  ["Planning Engineer", "Planning"], ["Project Manager", "Projects"],
  ["Skilled Welder", "Production"], ["Fabricator", "Production"],
].map(([role, department], k) => ({
  num: pad(k), role, department,
  mailto: `mailto:${CONTACT.email}?subject=${encodeURIComponent(role)}`,
}));

// PDFs currently hosted on the client's existing site. To self-host, copy them to public/rdso/
// and change RDSO_BASE to "/rdso/".
export const RDSO_BASE = process.env.NEXT_PUBLIC_RDSO_BASE || "https://www.parasmaniengineering.com/public/rdso-documents/";
export const rdsoDocs = [
  ["Company Registration", "Certificate of Incorporation, MOA, AOA & GST registration.", "company-registration.pdf"],
  ["Plant Layout", "Facility layout showing area and shop-wise arrangement.", "plant-layout.pdf"],
  ["Machinery & Process", "Machine list with capacity and process for cutting, drilling, welding, straightening and milling.", "machinery-process.pdf"],
  ["RDSO Registration", "Application acknowledgement. Registration ID to be updated on approval.", "rdso-registration.pdf", "IN PROCESS"],
  ["MSME Certificate", "Udyam / MSME registration under the enterprise category.", "msme-certificate.pdf"],
  ["Factory License", "Valid factory license with issue and expiry details.", "factory-license.pdf"],
  ["ISO 9001:2015", "Quality management system certification (IAF / BIS).", "iso-9001-2015.pdf"],
  ["Organisation Chart", "Plant head, shop in-charge, supervisors and artisans structure.", ""],
  ["Testing & NDT Reports", "DPT, UT, PAUT and RT reports with NABL certificate.", ""],
  ["Power Supply", "Electricity bill with demand power and installed supply details.", ""],
  ["Executed Works — Box Girders", "Supplies executed in the last 5 years (spans / tonnage).", ""],
  ["Works in Hand — Pipe Rack", "Current and ongoing works (spans / tonnage).", ""],
].map(([name, desc, file, status], k) => ({
  num: pad(k), name, desc,
  href: file ? RDSO_BASE + file : "",
  status: status || (file ? "SUBMITTED" : "ON REQUEST"),
  statusColor: status ? "var(--hl)" : file ? "var(--acc)" : "var(--mute)",
}));
