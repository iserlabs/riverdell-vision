// Demo lead + pipeline model. IMPORTANT: this layer is deliberately zero-PHI.
// It captures only name, contact, service interest, source and workflow state,
// never symptoms or clinical detail, so the prototype needs no BAA. In V2 this
// same shape is backed by a HIPAA-ready store (Supabase + BAA); here it is
// seeded sample data plus anything captured in the browser during the demo.

export type Pipeline =
  | "high-ticket"
  | "myopia"
  | "dry-eye"
  | "specialty"
  | "fort-lee";

export type Urgency = "high" | "medium" | "low";
export type Source = "Website form" | "Zocdoc" | "Phone" | "Google" | "Referral";
export type TaskType = "call" | "email" | "text" | "review";

export type FollowUpTask = {
  id: string;
  label: string;
  type: TaskType;
  due: string;
  done: boolean;
  script?: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: "Phone" | "Email" | "Text";
  location: string;
  serviceInterest: string;
  pipeline: Pipeline;
  stage: string;
  source: Source;
  urgency: Urgency;
  estValue: number;
  assignedTo: string;
  createdAt: string;
  lastActivity: string;
  tasks: FollowUpTask[];
  note?: string;
};

export const PIPELINES: Record<
  Pipeline,
  { label: string; stages: string[]; accent: string }
> = {
  "high-ticket": {
    label: "High-value inquiries",
    accent: "teal",
    stages: [
      "New inquiry",
      "Needs review",
      "Follow-up assigned",
      "Appointment offered",
      "Booked",
      "Completed",
      "Converted",
    ],
  },
  myopia: {
    label: "Myopia management",
    accent: "teal",
    stages: [
      "Parent inquiry",
      "Info needed",
      "Consult booked",
      "Exam completed",
      "Option presented",
      "Enrolled",
    ],
  },
  "dry-eye": {
    label: "Dry eye",
    accent: "clay",
    stages: [
      "Symptom inquiry",
      "Evaluation booked",
      "Testing done",
      "Recommendation made",
      "Accepted",
      "Maintenance",
    ],
  },
  specialty: {
    label: "Specialty lenses",
    accent: "clay",
    stages: [
      "Inquiry",
      "Records requested",
      "Consult booked",
      "Diagnostic fitting",
      "Lens ordered",
      "Success",
    ],
  },
  "fort-lee": {
    label: "Fort Lee waitlist",
    accent: "brass",
    stages: ["Waitlist", "Service interest", "Pre-opening request", "Booked"],
  },
};

const task = (
  id: string,
  label: string,
  type: TaskType,
  due: string,
  done = false,
  script?: string,
): FollowUpTask => ({ id, label, type, due, done, script });

export const SEED_LEADS: Lead[] = [
  {
    id: "L-2041",
    name: "Amanda Chen",
    email: "amanda.c@example.com",
    phone: "(201) 555-0142",
    preferredContact: "Phone",
    location: "Oradell, NJ",
    serviceInterest: "Myopia Management",
    pipeline: "myopia",
    stage: "Parent inquiry",
    source: "Website form",
    urgency: "high",
    estValue: 3200,
    assignedTo: "Maria (Front desk)",
    createdAt: "Today",
    lastActivity: "Today",
    tasks: [
      task("t1", "Call parent to answer questions and offer consult", "call", "Today", false, "Hi Amanda, this is Maria from Riverdell Vision returning your inquiry about myopia management for your child. Dr. Han sets aside dedicated time for these evaluations. Would a weekday afternoon or a Saturday work better to come in?"),
      task("t2", "Send myopia parent guide", "email", "Today", false),
    ],
    note: "Daughter age 8, prescription increased last year.",
  },
  {
    id: "L-2039",
    name: "Robert Mancini",
    email: "rmancini@example.com",
    phone: "(201) 555-0198",
    preferredContact: "Email",
    location: "River Edge, NJ",
    serviceInterest: "Dry Eye",
    pipeline: "dry-eye",
    stage: "Symptom inquiry",
    source: "Google",
    urgency: "high",
    estValue: 2400,
    assignedTo: "Unassigned",
    createdAt: "Today",
    lastActivity: "Today",
    tasks: [
      task("t1", "Assign owner and call to book dry eye evaluation", "call", "Today", false, "Hi Robert, thanks for reaching out about your dry eye symptoms. A dedicated dry eye evaluation finds the underlying cause so we can actually treat it. I can get you in this week, mornings or afternoons?"),
    ],
    note: "Drops no longer helping, worse on screens.",
  },
  {
    id: "L-2036",
    name: "Grace Park",
    email: "grace.park@example.com",
    phone: "(201) 555-0111",
    preferredContact: "Text",
    location: "Fort Lee, NJ",
    serviceInterest: "Specialty Lenses",
    pipeline: "specialty",
    stage: "Consult booked",
    source: "Referral",
    urgency: "high",
    estValue: 4800,
    assignedTo: "Priya (Tech)",
    createdAt: "2 days ago",
    lastActivity: "Yesterday",
    tasks: [
      task("t1", "Request prior corneal records from referring MD", "email", "Yesterday", true),
      task("t2", "Confirm diagnostic fitting appointment", "text", "Tomorrow", false),
    ],
    note: "Keratoconus, referred by cornea specialist.",
  },
  {
    id: "L-2033",
    name: "David Okafor",
    email: "d.okafor@example.com",
    phone: "(201) 555-0173",
    preferredContact: "Phone",
    location: "Paramus, NJ",
    serviceInterest: "Myopia Management",
    pipeline: "myopia",
    stage: "Option presented",
    source: "Zocdoc",
    urgency: "medium",
    estValue: 3600,
    assignedTo: "Dr. Han",
    createdAt: "6 days ago",
    lastActivity: "2 days ago",
    tasks: [
      task("t1", "Follow up on Ortho-K vs atropine decision", "call", "Today", false, "Hi, following up after your son's myopia consult. Have you and your family had a chance to think about the Ortho-K option Dr. Han recommended? Happy to answer any questions before we get started."),
    ],
    note: "Deciding between Ortho-K and atropine.",
  },
  {
    id: "L-2030",
    name: "Sofia Ramirez",
    email: "sofia.r@example.com",
    phone: "(201) 555-0155",
    preferredContact: "Email",
    location: "Emerson, NJ",
    serviceInterest: "Dry Eye",
    pipeline: "dry-eye",
    stage: "Recommendation made",
    source: "Website form",
    urgency: "medium",
    estValue: 2100,
    assignedTo: "Maria (Front desk)",
    createdAt: "1 week ago",
    lastActivity: "3 days ago",
    tasks: [
      task("t1", "Schedule in-office gland therapy series", "call", "Tomorrow", false),
      task("t2", "Send home-care instructions", "email", "3 days ago", true),
    ],
  },
  {
    id: "L-2028",
    name: "James Whitfield",
    email: "jwhit@example.com",
    phone: "(201) 555-0120",
    preferredContact: "Phone",
    location: "Oradell, NJ",
    serviceInterest: "Comprehensive Exam",
    pipeline: "high-ticket",
    stage: "Appointment offered",
    source: "Phone",
    urgency: "low",
    estValue: 650,
    assignedTo: "Maria (Front desk)",
    createdAt: "1 week ago",
    lastActivity: "4 days ago",
    tasks: [task("t1", "Confirm exam + eyewear appointment", "text", "Today", false)],
  },
  {
    id: "L-2025",
    name: "Lena Fischer",
    email: "lena.f@example.com",
    phone: "(201) 555-0166",
    preferredContact: "Text",
    location: "Fort Lee, NJ",
    serviceInterest: "Fort Lee Waitlist",
    pipeline: "fort-lee",
    stage: "Service interest",
    source: "Website form",
    urgency: "medium",
    estValue: 3200,
    assignedTo: "Dan (Owner)",
    createdAt: "5 days ago",
    lastActivity: "5 days ago",
    tasks: [task("t1", "Add to Fort Lee pre-opening SMS list (consented)", "text", "This week", false)],
    note: "Interested in myopia care for two kids when Fort Lee opens.",
  },
  {
    id: "L-2019",
    name: "Marcus Lee",
    email: "marcus.lee@example.com",
    phone: "(201) 555-0184",
    preferredContact: "Email",
    location: "Leonia, NJ",
    serviceInterest: "Specialty Lenses",
    pipeline: "specialty",
    stage: "Lens ordered",
    source: "Referral",
    urgency: "medium",
    estValue: 5200,
    assignedTo: "Priya (Tech)",
    createdAt: "2 weeks ago",
    lastActivity: "3 days ago",
    tasks: [task("t1", "Notify patient when scleral lenses arrive for dispense", "call", "This week", false)],
  },
  {
    id: "L-2015",
    name: "Nina Patel",
    email: "nina.p@example.com",
    phone: "(201) 555-0139",
    preferredContact: "Phone",
    location: "Oradell, NJ",
    serviceInterest: "Myopia Management",
    pipeline: "myopia",
    stage: "Enrolled",
    source: "Google",
    urgency: "low",
    estValue: 3400,
    assignedTo: "Dr. Han",
    createdAt: "3 weeks ago",
    lastActivity: "1 week ago",
    tasks: [task("t1", "Request Google review (positive experience)", "review", "This week", false, "Thank you for trusting us with your child's care. If you have a moment, a short Google review helps other Bergen County families find us. Here is the link.")],
  },
  {
    id: "L-2011",
    name: "Thomas Reyes",
    email: "t.reyes@example.com",
    phone: "(201) 555-0177",
    preferredContact: "Phone",
    location: "Dumont, NJ",
    serviceInterest: "Dry Eye",
    pipeline: "dry-eye",
    stage: "Maintenance",
    source: "Website form",
    urgency: "low",
    estValue: 1900,
    assignedTo: "Maria (Front desk)",
    createdAt: "1 month ago",
    lastActivity: "1 week ago",
    tasks: [task("t1", "Schedule 3-month maintenance check", "email", "Next week", false)],
  },
  {
    id: "L-2007",
    name: "Olivia Bennett",
    email: "olivia.b@example.com",
    phone: "(201) 555-0102",
    preferredContact: "Text",
    location: "River Edge, NJ",
    serviceInterest: "Specialty Lenses",
    pipeline: "specialty",
    stage: "Success",
    source: "Zocdoc",
    urgency: "low",
    estValue: 4600,
    assignedTo: "Priya (Tech)",
    createdAt: "6 weeks ago",
    lastActivity: "2 weeks ago",
    tasks: [task("t1", "Request review + annual recheck reminder set", "review", "Done", true)],
  },
  {
    id: "L-2004",
    name: "Henry Zhao",
    email: "henry.z@example.com",
    phone: "(201) 555-0191",
    preferredContact: "Email",
    location: "Cliffside Park, NJ",
    serviceInterest: "Fort Lee Waitlist",
    pipeline: "fort-lee",
    stage: "Waitlist",
    source: "Website form",
    urgency: "low",
    estValue: 2800,
    assignedTo: "Unassigned",
    createdAt: "Today",
    lastActivity: "Today",
    tasks: [task("t1", "Send Fort Lee welcome + confirm interest", "email", "Today", false)],
  },
];

// KPI helpers computed from a lead array so the dashboard reflects live data.
export function computeKpis(leads: Lead[]) {
  const openTasks = leads.flatMap((l) => l.tasks).filter((t) => !t.done);
  const dueToday = openTasks.filter((t) =>
    ["Today", "Now", "Overdue"].includes(t.due),
  ).length;
  const newToday = leads.filter((l) => l.createdAt === "Today").length;
  const highValueOpen = leads.filter(
    (l) => l.urgency === "high" && !["Converted", "Success", "Enrolled"].includes(l.stage),
  ).length;
  const pipelineValue = leads
    .filter((l) => !["Converted", "Success", "Enrolled", "Maintenance"].includes(l.stage))
    .reduce((sum, l) => sum + l.estValue, 0);
  const won = leads.filter((l) =>
    ["Converted", "Success", "Enrolled", "Maintenance"].includes(l.stage),
  ).length;
  const conversion = leads.length ? Math.round((won / leads.length) * 100) : 0;
  return { total: leads.length, newToday, dueToday, highValueOpen, pipelineValue, conversion, openTasks: openTasks.length };
}

export const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
