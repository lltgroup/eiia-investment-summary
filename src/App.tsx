import { useState } from "react";
import Checklist from "./Checklist";

// "p1-overview" for the investment summary, "p1-checklist" for the progress deployment.
const DEFAULT_VIEW = "p1-overview";

const NAVY = "#1B3A5C";
const ORANGE = "#C4581D";
const TEAL = "#1A6B72";
const WHITE = "#FFFFFF";
const PALE = "#F4F6F9";
const GREEN = "#1E7E34";
const RUST = "#8C2000";

const GAP_META = {
  visibility:   { label: "Visibility Gap",   color: "#C4581D", bg: "#FEF0E8" },
  findability:  { label: "Findability Gap",  color: "#1B3A5C", bg: "#E8EDF4" },
  experience:   { label: "Experience Gap",   color: "#1A6B72", bg: "#E8F4F5" },
  risk:         { label: "Risk Mitigation",  color: "#8C2000", bg: "#F9EDED" },
};

const PP_META = {
  PP1: { label: "PP1 — Members can't find what they need", color: "#1B3A5C" },
  PP2: { label: "PP2 — Login creates distrust", color: "#1A6B72" },
  PP3: { label: "PP3 — Members don't know which system they're in", color: "#1A6B72" },
  PP4: { label: "PP4 — No onboarding for new users", color: "#1A6B72" },
  PP5: { label: "PP5 — Automated emails undermine credibility", color: "#1A6B72" },
  PP6: { label: "PP6 — EIIA's story isn't visible", color: "#C4581D" },
  PP7: { label: "PP7 — Students hit a wall", color: "#1A6B72" },
  PP8: { label: "PP8 — Operational layer is fragile and exposed", color: "#8C2000" },
};

const BUCKET_COLORS = {
  // Phase 1
  "Public Website Redesign": "#C4581D",
  "Member Portal Rebuild": "#1B3A5C",
  "Identity, Auth & SSO": "#1A7A82",
  "Search & Resource Library": "#6A3D8C",
  "Secure Data & Forms": "#8C3D3D",
  "CRM Optimization": "#2A5C2A",
  "Student Experience — Phase 1+": "#C4581D",
  "Operational Integration": "#3D5A7A",
  // Phase 2
  "AI Foundation": "#3D5A7A",
  "Student Experience Automation": "#C4581D",
  "Prospect & Marketing Automation": "#1B3A5C",
  "Intelligent Search & AI Expansion": "#5C2D91",
  "Member Communication Automation": "#1A6B72",
  "Operational Integration & Workflow": "#3D5A7A",
  "Reporting & Analytics Access": "#7A5C2A",
  "Sports Census & Athletic Reporting": "#2A5C2A",
  // Phase 3
  "Eligibility Management System": "#8C3D3D",
  "Institutional Admin Console": "#2A5C2A",
  "Personalized Member Experience": "#2D2D8C",
  "Thought Leadership & Content Platform": "#8C5A1A",
  "Member Community & Network": "#1A5C5C",
  "AI Maturity & Prediction": "#4A1A6B",
};

// Bucket type tags: "required" or "enhancement"
const BUCKET_TYPE = {
  "Public Website Redesign": "required",
  "Member Portal Rebuild": "required",
  "Identity, Auth & SSO": "required",
  "Search & Resource Library": "required",
  "Secure Data & Forms": "required",
  "CRM Optimization": "required",
  "Student Experience — Phase 1+": "enhancement",
  "Operational Integration": "enhancement",
  "AI Foundation": "enhancement",
  "Student Experience Automation": "enhancement",
  "Prospect & Marketing Automation": "enhancement",
  "Intelligent Search & AI Expansion": "enhancement",
  "Member Communication Automation": "enhancement",
  "Operational Integration & Workflow": "enhancement",
  "Reporting & Analytics Access": "enhancement",
  "Sports Census & Athletic Reporting": "enhancement",
  "Eligibility Management System": "required",
  "Institutional Admin Console": "enhancement",
  "Personalized Member Experience": "enhancement",
  "Thought Leadership & Content Platform": "enhancement",
  "Member Community & Network": "enhancement",
  "AI Maturity & Prediction": "enhancement",
};

// ─── PHASE 1 ─────────────────────────────────────────────────────────────────

const PHASE1_BUCKETS = [
  {
    name: "Public Website Redesign", total: 93000, hrs: 372,
    tasks: [
      { task: "Discovery & Information Architecture", hrs: 8, cost: 2000, itemType: "required",
        what: "We map every page, section, and navigation path on the new site before a single design is created. This ensures the structure is built around what prospects and students actually need to find — not around how EIIA is internally organized.",
        gaps: ["visibility"], pps: ["PP6"],
        detail: "A site whose structure is built around the user's journey — not EIIA's org chart — is a site that converts. This is the blueprint everything else is built on." },
      { task: "Visual Design System", hrs: 24, cost: 6000, itemType: "required",
        what: "We build a complete design language — colors, typography, spacing, buttons, icons — that becomes the visual standard for every page on both the marketing site and the member portal. Everything built after this inherits these rules automatically.",
        gaps: ["visibility", "experience"], pps: ["PP6", "PP5"],
        detail: "A unified design system is what makes EIIA look like a single, professional organization rather than a collection of disconnected pages. It is also what makes the automated emails look like they came from the same organization as the website." },
      { task: "Wireframes — All Unique Layouts (12–15)", hrs: 30, cost: 7500, itemType: "required",
        what: "Before any visual design work begins, we build low-fidelity structural blueprints of every unique page layout on the site. These are approved by EIIA before high-fidelity design begins, eliminating expensive rework later.",
        gaps: ["visibility"], pps: ["PP6"],
        detail: "Wireframes ensure the right content is in the right place on every page before design decisions are locked. This is where we confirm that the Why EIIA section, the founding story, and the retention stats are positioned where prospects will actually see them." },
      { task: "High-Fidelity UI Mockups — Desktop + Mobile", hrs: 38, cost: 9500, itemType: "required",
        what: "Full-color, pixel-perfect designs for every approved page layout, shown in both desktop and mobile views. These are what EIIA approves before development begins — what you see is what gets built.",
        gaps: ["visibility", "experience"], pps: ["PP6", "PP7"],
        detail: "Mobile-first design is not optional for EIIA. Students submitting waivers and prospects evaluating membership are both frequently on their phones. This work ensures every experience is designed for mobile before it is adapted for desktop — not the other way around." },
      { task: "WordPress Theme Development", hrs: 32, cost: 8000, itemType: "required",
        what: "We build a custom WordPress theme that translates the approved designs into a working website. This is the foundation layer that every page sits on — responsive, fast, and built to EIIA's brand standards rather than a generic template.",
        gaps: ["visibility", "experience"], pps: ["PP6"],
        detail: "A purpose-built theme means EIIA is not constrained by what a template allows. Every layout decision made in the design phase is buildable. This is also what ensures the site performs consistently across all browsers and devices." },
      { task: "Page Templates & CMS Configuration", hrs: 42, cost: 10500, itemType: "required",
        what: "We build all reusable page templates directly into WordPress and configure the content management system so Emily's team can create, edit, and update pages without needing a developer. Every field is labeled. Every section is documented.",
        gaps: ["visibility"], pps: ["PP6"],
        detail: "EIIA's communications team should be able to publish a new case study, update a coverage page, or add a team bio without opening a support ticket. This work makes that possible and ensures the site's content stays current without ongoing dev dependency." },
      { task: "Student Program & Institution Pages (126+)", hrs: 20, cost: 5000, itemType: "required",
        what: "We build a templated system for generating individual institution pages — plan documents, ID card links, contact information — that can be created and updated in bulk. 126 institutions each get a dedicated, accurate page without 126 separate builds.",
        gaps: ["experience", "findability"], pps: ["PP7", "PP1"],
        detail: "Students looking up their institution's plan information currently have no reliable single place to find it. This work creates that place — scaled across every institution — and directly reduces the support calls that Jan and Krista's teams field during waiver season." },
      { task: "EIIA Story & Proof Points Section", hrs: 8, cost: 2000, itemType: "enhancement",
        what: "We design and build the section of the public site that makes EIIA's institutional credibility visible — the 95–97% retention rate, 25-year average member tenure, the civil rights founding story, and 2–3 case study layouts that demonstrate EIIA's depth of expertise.",
        gaps: ["visibility"], pps: ["PP6"],
        detail: "Dave Dietz said it directly: the content is equivalent to United Educators, it just isn't organized and presented the way theirs is. This section surfaces the proof that already exists — 50 years of institutional knowledge — in a format that communicates credibility before anyone picks up the phone." },
      { task: "Student Waiver Entry Points", hrs: 6, cost: 1500, itemType: "required",
        what: "We build the public-facing pages that direct students to their institution's waiver or enrollment form. Clear pathways, plain language, mobile-optimized — designed for someone who has never interacted with insurance before.",
        gaps: ["experience"], pps: ["PP7"],
        detail: "Right now students land on the same site as risk managers and have to find their way to a waiver form that may or may not work on their phone. These entry points create a direct, clear path from 'I need to waive' to the correct form in under two clicks." },
      { task: "Contact Forms + CRM Routing & Automation", hrs: 22, cost: 5500, itemType: "enhancement",
        what: "We build the contact and inquiry forms on the public site and connect them directly to Dynamics 365 CRM. Every form submission automatically creates a record in CRM — classified by inquiry type, routed to the right person, and triggering a professional acknowledgment email. No manual email routing. No missed inquiries.",
        gaps: ["visibility"], pps: ["PP6"],
        detail: "The current process relies on email routing and manual follow-up. This work creates a managed pipeline where every inquiry is captured in CRM within seconds of submission, assigned a follow-up task, and acknowledged professionally — with no human action required to route it correctly." },
      { task: "Navigation & Global Components", hrs: 14, cost: 3500, itemType: "required",
        what: "We build the header, footer, main navigation, mobile menu, breadcrumbs, and site-wide search bar that appear on every page. These elements set the navigational logic for the entire site and are the first things a visitor interacts with.",
        gaps: ["visibility", "experience"], pps: ["PP6", "PP3"],
        detail: "Confusing navigation is one of the most common reasons prospects leave a site without converting. A clear, well-organized global navigation tells a visitor immediately what EIIA offers, who it is for, and where to go next." },
      { task: "Content Migration + URL Redirects", hrs: 22, cost: 5500, itemType: "required",
        what: "We move approved existing content from the current eiia.org to the new CMS and set up redirects for every URL that changes. This ensures no content is lost, no links break, and search engine rankings are preserved during the transition.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "A migration done without proper redirects creates hundreds of broken links overnight. Every member bookmark, every Google search result, every document with a link to eiia.org needs to continue working. This work ensures the transition is invisible to the outside world." },
      { task: "Performance Optimization & QA", hrs: 18, cost: 4500, itemType: "required",
        what: "Before launch, we run a full technical quality pass — page speed testing, image optimization, caching configuration, and cross-browser and device testing. Every page is verified to load fast and display correctly across all major browsers and screen sizes.",
        gaps: ["experience"], pps: ["PP7"],
        detail: "A slow-loading site costs prospects and students. Studies consistently show that pages taking more than three seconds to load lose a significant portion of their visitors before the content is even seen. This work ensures EIIA's new site never makes that impression." },
      { task: "ADA Compliance — Double A (WCAG 2.1 AA)", hrs: 88, cost: 22000, itemType: "required",
        what: "Full WCAG 2.1 AA compliance across all public-facing pages — color contrast, keyboard navigation, screen reader compatibility, alt text governance, and form accessibility. Tested against automated tools and manual accessibility review.",
        gaps: ["experience"], pps: ["PP7"],
        detail: "WCAG 2.1 AA compliance ensures the public site is accessible to all users, including those with visual, motor, or cognitive disabilities. This is increasingly a legal baseline for organizations serving educational institutions and is included in Phase 1 scope." },
    ],
  },
  {
    name: "Member Portal Rebuild", total: 78000, hrs: 312,
    tasks: [
      { task: "Portal Information Architecture", hrs: 8, cost: 2000, itemType: "required",
        what: "We map the complete structure of the member portal — every section, every permission level, every navigation path — before design begins. This is where we solve the dashboard vs. portal confusion at the structural level.",
        gaps: ["experience", "findability"], pps: ["PP3", "PP1"],
        detail: "The confusion members experience between the dashboard and portal is not a design problem — it is an information architecture problem. Solving it here, before anything is designed, means the rebuilt portal is structurally impossible to navigate incorrectly." },
      { task: "Wireframes — Portal (10–14 Unique Layouts)", hrs: 28, cost: 7000, itemType: "required",
        what: "Low-fidelity structural blueprints for every unique page layout in the member portal — dashboard views, resource library, governance section, claims center, student administration, and more. Approved before design begins.",
        gaps: ["experience", "findability"], pps: ["PP3", "PP4", "PP1"],
        detail: "Wireframes lock the structure before visual decisions are made. This is where we confirm that the new user onboarding flow is built in, that Origami Risk is a prominent dashboard element rather than a buried link, and that each role sees a different default view." },
      { task: "High-Fidelity UI Mockups — Portal", hrs: 36, cost: 9000, itemType: "required",
        what: "Full-color designs for every approved portal layout, including role variations for each dashboard type — Risk Manager, Claims Administrator, Board Member, Student Administrator. Desktop and mobile for each.",
        gaps: ["experience"], pps: ["PP3", "PP4"],
        detail: "These designs are the contract between LLT and EIIA on what gets built. Every design decision about how a board member sees governance documents differently from a risk manager is locked here — before a line of code is written." },
      { task: "Role-Based Dashboard & Dynamic Rendering", hrs: 40, cost: 10000, itemType: "required",
        what: "We build the portal's core intelligence — the system that recognizes who is logged in and renders the right dashboard panels for that role. A board member and a risk manager log into the same URL but see a completely different experience.",
        gaps: ["experience", "findability"], pps: ["PP3", "PP4"],
        detail: "This is the single most impactful architectural decision in the portal rebuild. Role-based rendering eliminates the confusion of one-size-fits-all navigation, surfaces relevant content immediately, and removes the need for members to search for things that should already be on their dashboard." },
      { task: "Resource Library — Taxonomy & Browse UI", hrs: 22, cost: 5500, itemType: "required",
        what: "We rebuild the resource library with a governed category structure and a browse-by-category interface. Members can filter, sort, and navigate to resources without relying on search — and every resource is correctly tagged from the start.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "The current resource library has category sprawl that makes browsing functionally impossible. This work creates a governed taxonomy — a finite set of categories that Emily's team owns — and a browse interface that makes it easy to find resources even without knowing the exact search term." },
      { task: "Resource Detail & Document Pages", hrs: 12, cost: 3000, itemType: "required",
        what: "Individual resource page templates that display document metadata, related resources, download options, and permission-gated access controls. Members see what a resource is before they download it.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "Right now resources are often just links to PDFs with minimal context. A proper resource detail page tells the member what the document is, who it is for, when it was last updated, and what else is related. This context is what makes a resource library actually useful." },
      { task: "Governance Section — Document Repository", hrs: 14, cost: 3500, itemType: "required",
        what: "A dedicated, permission-gated section for board and committee materials — meeting minutes, agendas, financial documents, draft vs. final versions. Accessible directly from the main portal navigation without a separate login or app.",
        gaps: ["experience"], pps: ["PP3"],
        detail: "Board members currently navigate a governance experience that requires workarounds — files too large to email, calendar tools that create duplicate entries, and documents scattered across systems. This section puts everything in one place, inside the portal they already use." },
      { task: "Claims Center Landing Area", hrs: 8, cost: 2000, itemType: "required",
        what: "A dedicated claims section within the member portal with EIIA claims contacts, process guidance, relevant resources, and a clear link to Origami Risk for claim submission. Members know exactly where to go and what to do when something happens.",
        gaps: ["experience", "findability"], pps: ["PP1", "PP3"],
        detail: "When a member needs to file a claim, finding the right person and the right process should take seconds, not minutes of searching. This section creates a clear, credible entry point for one of the most stressful interactions a member will have." },
      { task: "New User Onboarding Flow (90-Day)", hrs: 16, cost: 4000, itemType: "enhancement",
        what: "A guided first-login experience that orients new members to the portal based on their role. A 90-day new user badge, skippable tour, and role-specific resource highlights ensure that anyone new to the portal — regardless of prior experience — knows where to start.",
        gaps: ["experience"], pps: ["PP4"],
        detail: "75% of EIIA member institutions have no dedicated risk manager. When someone new inherits the role, they inherit it with no guidance and no handoff. This onboarding flow is the first time EIIA has a structured answer to that recurring problem." },
      { task: "WordPress CMS Build — Portal", hrs: 68, cost: 17000, itemType: "required",
        what: "The full development of the member portal in WordPress — custom post types, content management fields, permission controls, editor experience, and all supporting infrastructure. This is the largest single build item in Phase 1.",
        gaps: ["experience", "findability"], pps: ["PP1", "PP3", "PP4"],
        detail: "The portal CMS build is the largest line item because it is the foundation for everything else in the member experience. Done right, it gives EIIA staff the ability to manage content, permissions, and resources without developer support for the life of the platform." },
      { task: "Protected Resource Access & Post-Login Redirect", hrs: 14, cost: 3500, itemType: "required",
        what: "When a member clicks a protected resource link — from an email, a bookmark, or a colleague — they are prompted to log in and then returned directly to the resource they were trying to access. No searching, no dead ends.",
        gaps: ["experience", "findability"], pps: ["PP1", "PP2"],
        detail: "Currently, clicking a member resource link while logged out sends the user to a generic login page with no memory of where they were trying to go. This work closes that gap — a logged-out member who clicks a resource link ends up at that resource, not at the homepage." },
      { task: "Mobile Optimization — Portal", hrs: 14, cost: 3500, itemType: "required",
        what: "A dedicated responsive build and QA pass for the member portal across mobile and tablet devices. Board member document access on mobile — a specific and common use case — is validated as a first-class experience.",
        gaps: ["experience"], pps: ["PP3", "PP7"],
        detail: "Board members often access governance documents on tablets or phones between meetings. The current portal was not designed for this. This work ensures that the portal is as functional on a 10-inch screen as on a desktop — including PDF downloads and governance materials." },
      { task: "Student Administrator Portal", hrs: 10, cost: 2500, itemType: "required",
        what: "A dedicated area within the member portal for student administrators — the EIIA staff contacts at each institution who manage waivers and enrollment. Waiver reports, eligibility access, and student resources in one place, separate from P&C content.",
        gaps: ["experience", "findability"], pps: ["PP7", "PP1"],
        detail: "Student administrators at member institutions currently have no dedicated home in the portal. They land in the same environment as risk managers and have to navigate around content that was not built for them. This section ends that." },
      { task: "Portal Performance & QA", hrs: 22, cost: 5500, itemType: "required",
        what: "A full technical quality pass of the member portal — load testing with the resource library at scale, cross-role permission testing, cross-browser validation, and a pre-launch QA sweep of every member-facing flow.",
        gaps: ["experience"], pps: ["PP2", "PP3"],
        detail: "A portal that works in isolation but breaks under real usage conditions — multiple users, large document loads, simultaneous logins — is worse than no portal. This QA pass ensures the rebuilt portal performs reliably from day one." },
    ],
  },
  {
    name: "Identity, Auth & SSO", total: 26000, hrs: 104,
    tasks: [
      { task: "Azure AD B2C Configuration & MFA Fix", hrs: 18, cost: 4500, itemType: "required",
        what: "We replace the current identity plugin with Azure Active Directory B2C — enterprise-grade identity management — and fix the MFA phone number format bug that causes first-time logins to fail. Includes session management and password reset flows.",
        gaps: ["experience"], pps: ["PP2"],
        detail: "The MFA failure on first login is one of the most documented and recurring pain points in discovery. It happens because the system requires a plus-one prefix that is never communicated to the user. This fix alone eliminates a category of support call that currently requires staff screen-sharing to resolve." },
      { task: "Account Creation Flow Rebuild", hrs: 14, cost: 3500, itemType: "required",
        what: "We eliminate the two-path account creation problem — where one path works and one is broken — and rebuild a single, clear account creation flow that new members complete without staff assistance.",
        gaps: ["experience"], pps: ["PP2", "PP4"],
        detail: "New members currently face a coin-flip when creating their account — one path works, one does not, and there is no indication of which is which. A single, reliable account creation flow removes the need for staff to manually guide new members through onboarding." },
      { task: "CRM to Portal Role Sync (Middleware)", hrs: 32, cost: 8000, itemType: "required",
        what: "We build the integration layer that makes CRM the single authority for member access. When a member's role is set or changed in Dynamics 365, their portal permissions update automatically — no manual provisioning, no lag.",
        gaps: ["experience"], pps: ["PP3", "PP4"],
        detail: "Right now member portal access is managed manually and separately from the CRM. This creates the permission drift that causes members to see content they should not, or miss content they should have. This middleware makes CRM the single source of truth for who has access to what." },
      { task: "Origami SSO Integration (SAML/OAuth)", hrs: 20, cost: 5000, itemType: "required",
        what: "We implement a clean single sign-on handoff from the member portal to Origami Risk. Members click one button on their dashboard and are in Origami — no separate login, no second password, no buried submenu link.",
        gaps: ["experience"], pps: ["PP3"],
        detail: "The current Origami access point is buried in a submenu and requires a separate login. This is one of the most commonly cited navigation frustrations in discovery. A prominent dashboard button with seamless SSO eliminates both problems simultaneously." },
      { task: "Email Template Redesign (Mailgun)", hrs: 10, cost: 2500, itemType: "required",
        what: "We redesign all transactional email templates — welcome, MFA setup, password reset, access change notifications — to be professionally branded, clearly written, and routed through Mailgun so they land in inboxes rather than spam folders.",
        gaps: ["experience"], pps: ["PP5", "PP2"],
        detail: "EIIA staff currently send manual warning emails before automated system emails arrive because the automated ones look like spam. This work eliminates that workaround entirely. Every automated touchpoint should look like it came from EIIA." },
      { task: "Permission Matrix Documentation", hrs: 4, cost: 1000, itemType: "required",
        what: "We document the complete role and permission structure — what each role sees, what triggers access, how CRM fields map to portal roles — in a reference document that EIIA staff can use for onboarding, troubleshooting, and future changes.",
        gaps: ["experience"], pps: ["PP3", "PP4"],
        detail: "Without documented permissions, every staff change, new member addition, or access question requires tribal knowledge. This documentation makes the system self-explanatory for current staff and transferable to future team members." },
      { task: "Auth QA & Security Review", hrs: 6, cost: 1500, itemType: "required",
        what: "A full quality pass of all authentication flows — login, MFA, password reset, SSO handoff to Origami, new user creation — plus a security review of the identity infrastructure before launch.",
        gaps: ["experience", "risk"], pps: ["PP2", "PP8"],
        detail: "Authentication failures are the most trust-damaging technical problems a member-facing system can have. This QA pass ensures every flow works under real conditions before a single member encounters the new system." },
    ],
  },
  {
    name: "Search & Resource Library", total: 34000, hrs: 136,
    tasks: [
      { task: "Search Architecture & Elasticsearch Setup", hrs: 16, cost: 4000,
        what: "We evaluate, select, and stand up Elasticsearch with the ElasticPress WordPress plugin. This replaces the native WordPress search with a purpose-built search engine capable of handling 1,200+ resources, PDF contents, and cross-site results.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "WordPress native search was never built for what EIIA is asking it to do. Elasticsearch is the industry-standard solution for content-heavy sites that need real search — not keyword matching. This is the infrastructure decision that makes everything else in this bucket possible." },
      { task: "Content Indexing — Pages & Resources", hrs: 16, cost: 4000,
        what: "We configure Elasticsearch to index all public pages and member resources with appropriate field weighting — so a search for a coverage type surfaces the right coverage page, not every page that mentions the word.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "Indexing without field weighting produces results that are technically correct but practically useless. This configuration work ensures that the most relevant results appear first — and that the search engine learns from the content structure rather than treating all text equally." },
      { task: "PDF Full-Text Indexing", hrs: 20, cost: 5000,
        what: "We configure Elasticsearch to extract and index the text contents of PDF documents — not just their filenames or metadata. A member searching for 'alcohol liability' finds the alcohol liability policy document even if the word is buried on page 12.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "This is the single most requested search improvement in discovery. The entire value of EIIA's 1,200-resource library is locked inside PDFs that current search cannot see. Full-text PDF indexing makes the library's contents searchable for the first time." },
      { task: "Permission-Aware Search", hrs: 14, cost: 3500,
        what: "We configure search so that logged-in members see both public and member-only results, while logged-out visitors only see public content. If a member resource matches a logged-out search, the user is prompted to log in rather than hitting a dead end.",
        gaps: ["findability", "experience"], pps: ["PP1", "PP2"],
        detail: "Currently, a member who searches while logged out may find nothing — not because the resource does not exist, but because the search does not know to prompt them to log in. Permission-aware search removes that invisible barrier and turns it into a guided action." },
      { task: "Search UI — Public Site", hrs: 10, cost: 2500,
        what: "We design and build the search experience on the public marketing site — search bar placement, results page layout, result card design, faceted filter options, and the no-results state that guides users when a query returns nothing.",
        gaps: ["visibility", "findability"], pps: ["PP1", "PP6"],
        detail: "A prospect who searches for 'international student insurance' on eiia.org should immediately find the right coverage page and relevant resources. The current search experience fails this basic test. This work ensures it does not." },
      { task: "Search UI — Member Portal", hrs: 12, cost: 3000,
        what: "We build the unified search bar in the portal header and the search results page that surfaces both public and member-side content in one view, with faceted filters and a no-results guidance state.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "Members currently have to know which system their resource might be in before they search. A unified portal search bar removes that prerequisite — one search, one results page, everything EIIA has that is relevant to the query." },
      { task: "Taxonomy Restructure & Content Governance", hrs: 10, cost: 2500,
        what: "We collapse the current sprawling resource categories into a governed, finite taxonomy. We build admin-side guardrails so editors can only assign resources to approved categories — preventing the tag sprawl that has made the current library unsearchable.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "The current resource library has accumulated tags without governance for years. This restructure is a one-time cleanup that creates lasting order — and the guardrails ensure the problem does not recur. Emily's team gets clear ownership of the taxonomy and the tools to maintain it." },
      { task: "Single Upload Workflow", hrs: 14, cost: 3500,
        what: "We build an upload-once, tag-once publishing workflow. When a staff member uploads a PDF, it automatically creates a resource entry with inherited metadata. The document appears everywhere it should without being uploaded or tagged a second time.",
        gaps: ["findability"], pps: ["PP1", "PP8"],
        detail: "EIIA staff currently upload documents twice and enter metadata manually each time. This workflow removes the duplication entirely — one upload, one tag, correct placement everywhere. It also eliminates the inconsistency that comes from double-entry data." },
      { task: "Search Analytics Dashboard", hrs: 14, cost: 3500,
        what: "We instrument the search to capture what members search for most, which queries return no results, and how often search leads to a click. A simple internal dashboard surfaces this data for Emily's team to review and use for content decisions.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "The failed query log is one of the most valuable tools a content team can have. Every search that returns nothing is a gap in the resource library. This dashboard makes those gaps visible and turns them into an ongoing content roadmap." },
      { task: "Search QA & Relevance Tuning", hrs: 10, cost: 2500,
        what: "Before launch, we run a comprehensive QA pass using real test queries drawn from the most common member search terms identified in discovery. We validate PDF indexing, permission filtering, synonym handling, and relevance ranking.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "A search engine that has never been tuned with real queries is likely to surface the wrong results first. This tuning pass ensures that the search works the way members expect from day one — not after months of complaints and adjustments." },
    ],
  },
  {
    name: "Secure Data & Forms", total: 38000, hrs: 152,
    tasks: [
      { task: "Architecture Design & Technical Specification", hrs: 14, cost: 3500,
        what: "Before any development begins, we produce a complete technical specification for the new data architecture — separate database, API surface, data flow diagrams, and hosting environment decisions. This document is the blueprint for everything built in this bucket.",
        gaps: ["risk"], pps: ["PP8"],
        detail: "Building without a technical specification in a security-sensitive context is how the current architecture problems were created. This specification is the guarantee that the rebuild has a clear design before it has code." },
      { task: "Application Database Setup & Separation", hrs: 20, cost: 5000,
        what: "We provision a separate application database completely isolated from the public-facing web server, migrate existing form and student data off the current MySQL database, close the exposed port, and implement proper backup and access controls.",
        gaps: ["risk"], pps: ["PP8"],
        detail: "Student PII sitting on a public-facing web server is the most serious technical risk identified in discovery. Gerry Hamill described it as a 20-year IT best practice violation. This work resolves that exposure and brings EIIA into compliance with basic data security standards." },
      { task: "Gravity Forms to CRM API Integration", hrs: 42, cost: 10500,
        what: "We configure Gravity Forms to submit data directly to Dynamics 365 CRM via API — bypassing the WordPress database entirely. Form submissions go where they are supposed to go. Nothing sensitive is stored on the web server.",
        gaps: ["risk", "experience"], pps: ["PP8", "PP7"],
        detail: "The current setup stores form submissions in the WordPress database — the same database that is accessible from the public web server. This integration routes form data directly to its destination, closing the exposure and ensuring every submission is captured correctly in CRM." },
      { task: "Azure Blob Storage — File Upload Integration", hrs: 18, cost: 4500,
        what: "We route all file uploads — including student ID card images, waiver documents, and institutional files — directly to Azure Blob Storage rather than storing them on the web server. Secure access URLs with expiration ensure files are only accessible to authorized users. This also replaces Zyx's secure file delivery functionality with a more capable, auditable solution.",
        gaps: ["risk"], pps: ["PP8"],
        detail: "Files stored on a public web server are accessible to anyone who can guess the URL. Azure Blob Storage with access-controlled URLs means uploaded documents are only retrievable by people with explicit permission — and only for a defined period of time. The Zyx encryption tool being retired by its vendor is fully replaced by this capability." },
      { task: "Form Classification & Routing Architecture", hrs: 14, cost: 3500,
        what: "We audit and classify every existing Gravity Form by type — simple notification forms versus lifecycle management forms — and implement the appropriate routing for each. Every form's data flow is documented.",
        gaps: ["risk", "experience"], pps: ["PP8", "PP7"],
        detail: "Not all forms have the same data sensitivity or routing needs. A contact form and a student waiver form are fundamentally different things that require different handling. This classification work ensures every form is routed correctly rather than all data landing in the same place." },
      { task: "Waiver Forms — Secure Routing (FERPA)", hrs: 20, cost: 5000,
        what: "We re-architect the student waiver forms specifically — secure submission routing, FERPA-compliant PII handling, file uploads routed to Azure Blob, and submission data sent to CRM. Student ID card uploads are auto-deleted after processing.",
        gaps: ["risk", "experience"], pps: ["PP8", "PP7"],
        detail: "Student waiver forms collect personally identifiable information under FERPA protection. The current architecture does not handle this data in a FERPA-compliant way. This work brings the waiver process into compliance and removes the liability exposure that currently exists." },
      { task: "Data Retention Policy Implementation", hrs: 10, cost: 2500,
        what: "We implement automated data retention rules — how long form data is kept, when it is archived, and when it is deleted. Student PII and FERPA-protected data are handled according to defined schedules rather than being stored indefinitely.",
        gaps: ["risk"], pps: ["PP8"],
        detail: "Data that has no retention policy is data that is stored forever. Indefinite storage of student PII is a compliance risk. Automated retention schedules ensure EIIA is only holding data it needs for as long as it needs it — and purging it on a defined schedule." },
      { task: "Security Audit & Documentation", hrs: 14, cost: 3500,
        what: "A post-implementation security review of the new architecture — validating that no PII remains on public infrastructure, confirming the port exposure is resolved, and producing documentation of all data flows for Scott's IT team to review and maintain.",
        gaps: ["risk"], pps: ["PP8"],
        detail: "A rebuild without a formal security audit is a rebuild that may have introduced new vulnerabilities while closing old ones. This audit provides an independent verification that the new architecture meets basic security standards — and gives Scott's team a documented baseline to maintain." },
    ],
  },
  {
    name: "CRM Optimization", total: 23500, hrs: 94,
    tasks: [
      { task: "Prospect Pipeline Configuration", hrs: 14, cost: 3500, itemType: "enhancement",
        what: "We build the prospect pipeline stages in Dynamics 365 — from first contact through membership decision. Contact form submissions automatically create leads, assign follow-up tasks to Doug or Jan, and move through pipeline stages without manual intervention.",
        gaps: ["visibility"], pps: ["PP6"],
        detail: "EIIA currently has no structured prospect pipeline. Inquiries arrive and are handled individually, with no visibility into the overall prospect funnel. This configuration gives Doug and Jan a managed process where every inquiry is tracked, attributed, and followed up." },
      { task: "Member Permissioning Sync", hrs: 12, cost: 3000, itemType: "required",
        what: "We build CRM as the single authority for portal access — the fields that define a member's role in CRM automatically sync to portal permissions. When access changes in CRM, the portal updates in real time.",
        gaps: ["experience"], pps: ["PP3"],
        detail: "Manual permission management is what creates the access inconsistencies members experience today. CRM as the authority means a single change in one place propagates everywhere — and the permission matrix is always accurate." },
      { task: "Origami Provisioning Workflow", hrs: 14, cost: 3500, itemType: "required",
        what: "When a member's CRM record is updated to grant Origami Risk access, the system automatically provisions their portal account and Origami access without requiring manual action from Jen or Oren.",
        gaps: ["experience"], pps: ["PP2", "PP3"],
        detail: "Origami provisioning currently requires manual action from EIIA staff for every new member. This automation eliminates that step entirely — access granted in CRM triggers everything downstream automatically." },
      { task: "Mailgun Integration for CRM-Triggered Comms", hrs: 10, cost: 2500, itemType: "required",
        what: "We route all CRM-triggered emails through Mailgun with professional EIIA-branded templates. Prospect acknowledgments, access change notifications, and nurture sequence triggers all look like they came from EIIA.",
        gaps: ["experience"], pps: ["PP5"],
        detail: "CRM-triggered emails that land in spam or arrive unbranded undermine the professional relationship EIIA is trying to build. Mailgun routing with branded templates ensures every automated communication reinforces EIIA's credibility rather than eroding it." },
      { task: "Campus Visit Logging & Service Plan Tracking", hrs: 22, cost: 5500, itemType: "required",
        what: "We define what gets logged in CRM after every member interaction — campus visits, risk assessments, claims conversations — and build CRM activity templates that make logging fast and consistent for Doug and Greg's teams. We also bring risk management service plan completion status into CRM so Doug and Greg can see which members are current on service plan requirements without running a separate report.",
        gaps: ["visibility"], pps: ["PP6"],
        detail: "Without consistent interaction logging, EIIA's institutional knowledge lives in individual staff members' memories rather than in the system. Service plan tracking in a spreadsheet is a process that does not scale. This combined work ensures every significant member interaction is captured and every institution's service plan status is visible in CRM — so when Greg or Doug visits a campus, the full context is already there." },
      { task: "CRM Internal Standards Documentation", hrs: 6, cost: 1500, itemType: "enhancement",
        what: "We document CRM usage standards for all teams — what gets logged, by whom, in what format, and how to handle common scenarios. This addresses the 'we have a CRM, we're just not using it' problem identified in the January 30 discovery session.",
        gaps: ["visibility"], pps: ["PP6"],
        detail: "A CRM that is used inconsistently is only marginally better than no CRM. Clear usage standards ensure that the system becomes the institutional memory it is supposed to be — and that new staff can get up to speed without relying on tribal knowledge." },
      { task: "CRM QA & Staff Training", hrs: 8, cost: 2000, itemType: "required",
        what: "A QA pass of all CRM automations and a focused training session for Emily, Doug, and Jan's teams on the new workflows — prospect pipeline, form routing, and interaction logging.",
        gaps: ["visibility", "experience"], pps: ["PP5", "PP6"],
        detail: "Automations that work technically but that staff do not understand will be worked around within weeks. This training ensures the investment in CRM configuration is realized through actual adoption — and that the team can maintain and extend the workflows going forward." },
      { task: "Origami to CRM Data Feed Setup", hrs: 8, cost: 2000, itemType: "required",
        what: "We establish a data feed from Origami Risk into CRM that pulls key segmentation fields — program enrollment, coverage types, renewal dates — so that member records in CRM reflect the full picture of the relationship.",
        gaps: ["visibility"], pps: ["PP6"],
        detail: "Right now CRM and Origami are siloed. Doug and Greg have to check two systems to get a complete picture of a member relationship. This feed makes CRM the single place where the full institutional context is visible." },
    ],
  },
  {
    name: "Student Experience — Phase 1+", total: 34000, hrs: 136,
    tasks: [
      { task: "Automated Waiver Reminder System (email + text)", hrs: 20, cost: 5000,
        what: "The system automatically sends deadline-triggered email and text reminders to students with institution-specific messaging — without any action from EIIA staff.",
        gaps: ["experience"], pps: ["PP7"],
        detail: "Jan and Krista's teams currently manage waiver reminders manually. This automation eliminates that effort entirely and ensures no student misses a deadline because a reminder was not sent." },
      { task: "Auto-Approved Carrier Configuration & Admin Logic", hrs: 18, cost: 4500,
        what: "We build an admin-facing interface that allows Krista's team to manage auto-approved carrier lists and basic conditional approval flows without developer involvement. Submissions from known auto-approved carriers are processed automatically; edge cases are flagged for manual review.",
        gaps: ["experience", "risk"], pps: ["PP7", "PP8"],
        detail: "Krista recently implemented auto-approved carriers manually. This work gives her team a structured admin interface to manage those rules — adding carriers, editing conditions, setting institution-specific overrides — without the tedious manual process currently required for each change." },
      { task: "Waiver Form Annual Reset Automation", hrs: 10, cost: 2500,
        what: "The twice-yearly open and close of waiver season is handled via configuration settings rather than manual form updates by EIIA staff.",
        gaps: ["experience", "risk"], pps: ["PP7", "PP8"],
        detail: "Manual waiver season resets are a recurring operational task with real consequences if missed or delayed. Automation eliminates the dependency on a staff member remembering to make the change at the right time." },
      { task: "Adds and Drops Processing via Web", hrs: 26, cost: 6500,
        what: "Standard student add and drop requests are handled via the portal without staff intervention. Exception cases are escalated automatically with relevant context.",
        gaps: ["experience"], pps: ["PP7"],
        detail: "Adds and drops are currently handled manually by EIIA staff for each request. Routing standard cases through the portal returns significant staff hours during the busiest periods of the student program calendar." },
      { task: "Institutional Roster Comparison Engine", hrs: 30, cost: 7500,
        what: "Submitted student data is automatically compared against the institution's eligibility roster. Mismatches, duplicates, and ineligible submissions are flagged for review without manual cross-referencing.",
        gaps: ["risk"], pps: ["PP8"],
        detail: "Roster comparison is currently done manually using spreadsheets. An automated comparison engine catches errors and ineligible submissions instantly — before they become problems downstream." },
      { task: "Student Waiver QA & End-to-End Testing", hrs: 20, cost: 5000,
        what: "A QA pass across institution-specific waiver configurations — testing auto-approval logic, roster comparison, PII handling, and Azure Blob storage routing before any automation goes live.",
        gaps: ["experience", "risk"], pps: ["PP7", "PP8"],
        detail: "Automated systems that have not been tested across the full range of institution configurations can fail in ways that are hard to detect until they cause real problems. This QA pass ensures the automation works correctly for every institution before it is active." },
      { task: "Carrier Export Templates", hrs: 12, cost: 3000,
        what: "Standardized data export formats for carrier reporting reduce the manual spreadsheet preparation that Krista and Jan's teams currently perform for each carrier submission.",
        gaps: ["risk"], pps: ["PP8"],
        detail: "Manual carrier reporting is a recurring operational burden with real error risk. Standardized export templates ensure accuracy, reduce preparation time, and make the reporting process repeatable." },
    ],
  },
  {
    name: "Operational Integration", total: 16250, hrs: 65,
    tasks: [
      { task: "Power Automate Integration — Form Routing", hrs: 20, cost: 5000, itemType: "required",
        what: "Gravity Forms submissions are connected to Power Automate to trigger internal workflow routing — approvals, notifications, and task creation happen automatically based on form events rather than requiring manual staff action.",
        gaps: ["risk"], pps: ["PP8"],
        detail: "Internal workflows that depend on a staff member reading an email and manually taking action are workflows that break when that person is busy, sick, or on vacation. Power Automate makes the workflow reliable regardless of individual availability." },
      { task: "Origami to CRM Data Feed Refinement", hrs: 18, cost: 4500, itemType: "required",
        what: "We pull additional segmentation fields from Origami into CRM — program enrollment details, coverage types, renewal dates, key account flags — so member records reflect the complete relationship.",
        gaps: ["visibility"], pps: ["PP6"],
        detail: "Doug and Greg currently check multiple systems to get a complete picture before a campus visit. A refined Origami to CRM feed makes CRM the single source of institutional context." },
      { task: "CRM to Data Warehouse Sync Optimization", hrs: 12, cost: 3000, itemType: "enhancement",
        what: "We refine the daily CRM to Data Warehouse sync to include new CRM fields and validate that all reporting pulls from accurate, up-to-date data.",
        gaps: ["visibility"], pps: ["PP6"],
        detail: "Reports built on stale or incomplete CRM data produce incorrect insights. This sync optimization ensures the Data Warehouse reflects the full CRM configuration from day one." },
      { task: "Integration QA & Regression Testing", hrs: 15, cost: 3750, itemType: "required",
        what: "A QA pass of all Phase 1 integrations — Power Automate, Origami data feed, CRM sync — plus regression testing to confirm that existing functionality is unaffected by the new integration layer.",
        gaps: ["risk"], pps: ["PP8"],
        detail: "New integrations can break existing ones in ways that are not immediately obvious. Regression testing ensures that integration additions do not create problems elsewhere in the system." },
    ],
  },
];

// ─── PHASE 2 ─────────────────────────────────────────────────────────────────

const PHASE2_BUCKETS = [
  {
    name: "AI Foundation", total: 20000, hrs: 80,
    tasks: [
      { task: "AI Governance Framework & Content Classification", hrs: 16, cost: 4000,
        what: "Before any AI features are built, we define what the AI can and cannot access — classifying content into tiers (Public, Member-Only, Internal, PII, PHI) and documenting the rules for AI retrieval, audit logging, and human-in-the-loop requirements for compliance decisions.",
        gaps: ["risk", "findability"], pps: ["PP8", "PP1"],
        detail: "AI built without a governance framework in an insurance context is a compliance liability. This framework is the guardrail that ensures AI features can be deployed confidently — with Greg Logan's requirement for human oversight of compliance-sensitive decisions built in from the start." },
      { task: "Vector Index Foundation on Elasticsearch", hrs: 28, cost: 7000,
        what: "We set up the vector embedding infrastructure that will power semantic search and the AI resource assistant. All content is embedded and indexed — AI-powered features are activated on top of this foundation.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "Vector embeddings are what allow an AI to understand that a question about 'event with alcohol' is really a question about alcohol liability — without requiring an exact keyword match. Building this infrastructure means AI features can be activated quickly rather than requiring months of setup." },
      { task: "Semantic Search Layer", hrs: 24, cost: 6000,
        what: "An enhancement that layers intent-based matching on top of Elasticsearch. A member who searches for 'what do I do if a student gets hurt at an event' surfaces the right resources even without knowing the exact coverage term.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "Semantic search bridges the gap between how members think about their needs and how EIIA's resources are labeled. It is the difference between a search that requires the right keyword and a search that understands the question." },
      { task: "Search Analytics & Failed Query Logging", hrs: 12, cost: 3000,
        what: "We instrument search to log every query that returns few or no results. This data becomes the training signal for AI tuning — knowing what members cannot find is the most valuable input for improving the resource assistant.",
        gaps: ["findability"], pps: ["PP1"],
        detail: "Failed queries are not failures — they are a roadmap for what content needs to be created or re-tagged. This logging infrastructure turns search frustration into actionable content intelligence for Emily's team and the AI build." },
    ],
  },
  {
    name: "Student Experience Automation", total: 47000, hrs: 188,
    tasks: [
      { task: "Student-Facing Waiver Status Dashboard", hrs: 30, cost: 7500,
        what: "After submitting a waiver, students can check their status — Accepted, Pending, or Issues — without calling their school or EIIA.",
        gaps: ["experience"], pps: ["PP7"],
        detail: "'Where is my waiver?' is one of the most common student support calls. This dashboard eliminates it by giving students direct visibility into their submission status." },
      { task: "Pre-Populated Returning Student Data", hrs: 26, cost: 6500,
        what: "Returning students see their prior year information pre-filled in the waiver form. They confirm rather than re-enter, reducing errors and submission time.",
        gaps: ["experience"], pps: ["PP7"],
        detail: "Re-entering the same insurance carrier information year after year is a friction point that causes students to abandon waiver submissions. Pre-population makes the returning student experience near-instant." },
      { task: "Eligibility Rules Engine — Admin UI Enhancement", hrs: 40, cost: 10000,
        what: "A streamlined admin interface for building and managing institution-specific eligibility rules. The conditional logic capabilities that exist today are preserved, but the UI is rebuilt to eliminate the tedious, error-prone manual process currently required to implement and modify rules.",
        gaps: ["experience", "risk"], pps: ["PP7", "PP8"],
        detail: "The eligibility rules engine functionality exists today — Krista can select an institution and apply rules. The problem is that building and modifying those rules is extremely time-consuming. This work rebuilds the admin experience so rule management takes minutes, not hours." },
      { task: "International Student Experience Redesign", hrs: 20, cost: 5000,
        what: "Inbound and outbound international student pathways are clearly separated with dedicated flows, plain language guidance, and mobile-optimized forms for each.",
        gaps: ["experience"], pps: ["PP7"],
        detail: "International student insurance is a distinct product with distinct requirements. Blending it with domestic student flows creates confusion that generates support calls. Separation creates clarity." },
      { task: "Student Experience Phase 2 QA", hrs: 22, cost: 5500,
        what: "A full QA pass of Phase 2 student experience features — waiver status dashboard, pre-populated data, eligibility admin UI, and international student flows — tested across multiple institution configurations.",
        gaps: ["experience", "risk"], pps: ["PP7", "PP8"],
        detail: "Phase 2 student features build on the Phase 1 foundation. This QA pass validates that new capabilities work correctly alongside existing automation without creating conflicts or regressions." },
    ],
  },
  {
    name: "Prospect & Marketing Automation", total: 20000, hrs: 80,
    tasks: [
      { task: "Automated Prospect Nurture Sequences", hrs: 14, cost: 3500, gaps: ["visibility"], pps: ["PP6"],
        what: "A CRM-triggered email series delivers educational content about EIIA automatically to prospects during their evaluation period — without manual outreach from Doug or Jan.",
        detail: "Prospects who inquire and hear nothing for weeks move on. An automated nurture sequence keeps EIIA present and credible during the evaluation period without requiring staff time." },
      { task: "CRM Pipeline Stage Automation", hrs: 12, cost: 3000, gaps: ["visibility"], pps: ["PP6"],
        what: "Pipeline stages advance automatically based on prospect behavior and elapsed time. Follow-up tasks are created and assigned without manual management.",
        detail: "A pipeline that requires manual stage management is a pipeline that does not get managed. Automation ensures prospects move through the funnel consistently regardless of how busy the team is." },
      { task: "Lead Scoring Configuration", hrs: 10, cost: 2500, gaps: ["visibility"], pps: ["PP6"],
        what: "We configure basic lead scoring in Dynamics 365 based on inquiry type, institution size, and program interest — giving Doug and Jan a prioritized view of which prospects deserve immediate attention.",
        detail: "Not all prospect inquiries represent the same opportunity. Lead scoring surfaces the highest-value prospects so the team spends time where it is most likely to result in membership." },
      { task: "Membership Overview PDF — Auto-Delivery", hrs: 8, cost: 2000, gaps: ["visibility"], pps: ["PP6"],
        what: "A downloadable membership overview document is available on the public site and automatically delivered via CRM nurture email to every new prospect inquiry.",
        detail: "Prospects who inquire should immediately receive something tangible that explains what EIIA membership includes. This automates that first touchpoint." },
      { task: "Webinar Promotion & Registration Workflow", hrs: 12, cost: 3000, gaps: ["visibility"], pps: ["PP6"],
        what: "Automated webinar promotion emails go to prospect and member lists. Registration confirmation and reminder sequences are triggered without manual setup for each event.",
        detail: "Webinar promotion is currently a manual effort. Automation reduces the operational overhead per event and ensures consistent promotion to the full prospect and member list." },
      { task: "Prospect Pipeline Reporting Dashboard", hrs: 12, cost: 3000, gaps: ["visibility"], pps: ["PP6"],
        what: "Doug and Jan can see pipeline status, prospect activity, and next actions in CRM without needing a report generated for them.",
        detail: "Pipeline visibility that requires a staff member to generate a report on demand is pipeline visibility that gets checked infrequently. A live dashboard makes the pipeline status a daily reference rather than a periodic event." },
      { task: "Post-Contact Nurture QA & Compliance", hrs: 12, cost: 3000, gaps: ["visibility", "experience"], pps: ["PP5", "PP6"],
        what: "A full QA pass of all automated sequences — timing, content accuracy, CRM trigger reliability, unsubscribe compliance — before any prospect receives an automated email.",
        detail: "Automated emails that arrive at the wrong time, reference incorrect information, or fail unsubscribe compliance create worse impressions than no email at all. This QA pass ensures every automated touchpoint works as intended." },
    ],
  },
  {
    name: "Intelligent Search & AI Expansion", total: 41000, hrs: 164,
    tasks: [
      { task: "Member-Facing AI Resource Assistant (RAG)", hrs: 52, cost: 13000, gaps: ["findability"], pps: ["PP1"],
        what: "A conversational search tool that understands natural language questions and returns relevant resources with context. A member types 'what do I need for an event with alcohol?' and gets the right liability resources — not a list of keyword matches.",
        detail: "This is the payoff of the AI Foundation investment. The resource assistant does not give coverage advice — it surfaces the right resources for the question. Greg Logan's requirement for human oversight on compliance decisions is enforced at the system level." },
      { task: "Triage & Escalation Logic to Staff", hrs: 20, cost: 5000, gaps: ["findability", "experience"], pps: ["PP1"],
        what: "When a member's question goes beyond what resource discovery can answer, the AI assistant identifies this and routes the member to the appropriate EIIA staff contact — rather than returning no results or an unhelpful response.",
        detail: "An AI that cannot answer a question and says nothing is frustrating. An AI that cannot answer a question and connects the member to the right person is genuinely useful. This escalation logic is what separates a helpful tool from an abandoned one." },
      { task: "AI Governance Enforcement Layer", hrs: 14, cost: 3500, gaps: ["risk"], pps: ["PP8"],
        what: "The content classification tiers defined in the AI Foundation are enforced at query time — the AI can only surface content it is authorized to surface for the member's role. All queries are audit-logged.",
        detail: "Governance without enforcement is just documentation. This layer ensures the rules are actively applied every time a member uses the AI assistant — and that every interaction is logged for compliance review." },
      { task: "AI-Driven Related Resource Intelligence", hrs: 18, cost: 4500, gaps: ["findability"], pps: ["PP1"],
        what: "When a member views any resource, the AI surfaces related resources based on content similarity — replacing the static, manually maintained related-resource tags that currently require ongoing staff maintenance.",
        detail: "Related resource suggestions that are manually maintained become stale within months. AI-driven suggestions stay current automatically and surface connections that a manual tagging process would never make." },
      { task: "Search Personalization by Role & Program", hrs: 22, cost: 5500, gaps: ["findability"], pps: ["PP1"],
        what: "Search results are weighted by the member's role, institution program enrollment, and prior access behavior. A student administrator searching for 'enrollment' sees different top results than a risk manager searching the same term.",
        detail: "Generic search treats every member the same. Personalized search recognizes that the most relevant result for a risk manager and a student administrator are fundamentally different — even for the same query." },
      { task: "Failed Query Resolution Workflow", hrs: 12, cost: 3000, gaps: ["findability"], pps: ["PP1"],
        what: "A systematic process for reviewing AI failed queries — the things members searched for and did not find. Staff see the gaps, create resources or update taxonomy to fill them, and the AI improves over time.",
        detail: "The AI resource assistant is not a static tool — it improves as the resource library improves. This workflow creates a feedback loop between what members need and what the library contains." },
      { task: "AI Assistant QA & Compliance Testing", hrs: 26, cost: 6500, gaps: ["risk", "findability"], pps: ["PP8", "PP1"],
        what: "A full QA pass validating that the AI assistant cannot give coverage advice, returns only approved content, escalates appropriately, and logs all queries before any member uses it.",
        detail: "An AI assistant deployed in an insurance context without compliance testing is a legal and reputational risk. This QA pass is the gate that ensures the tool is safe to deploy." },
    ],
  },
  {
    name: "Member Communication Automation", total: 18000, hrs: 72,
    tasks: [
      { task: "New Member Welcome Sequence (30/60/90 day)", hrs: 14, cost: 3500, gaps: ["experience"], pps: ["PP4", "PP5"],
        what: "Automated email touchpoints at 30, 60, and 90 days for new members — role-specific content tracks that introduce key resources, upcoming events, and available services at the right time rather than all at once.",
        detail: "Onboarding is not a single event — it is a ramp. A structured 90-day email sequence ensures new members discover EIIA's value over time rather than being overwhelmed at login or forgotten after the welcome email." },
      { task: "Governance Meeting Notification Automation", hrs: 10, cost: 2500, gaps: ["experience"], pps: ["PP3"],
        what: "When meeting materials are uploaded to the portal, board members are automatically notified with a direct link to the documents and a calendar invite — without Beth manually sending emails.",
        detail: "Beth's manual governance notification process is a recurring operational task that is entirely automatable. This frees staff time while ensuring board members receive consistent, timely, professional communications." },
      { task: "Claims Submission Confirmation & Status Alerts", hrs: 10, cost: 2500, gaps: ["experience"], pps: ["PP5"],
        what: "Members receive an automatic professional acknowledgment when a claim is submitted and status update notifications at key milestones — without staff manually reaching out at each stage.",
        detail: "Claims are stressful for members. Automated, professional acknowledgments and status updates reduce anxiety and staff inbound questions while making EIIA feel responsive even during busy claims periods." },
      { task: "Resource Library Update Notifications", hrs: 8, cost: 2000, gaps: ["findability"], pps: ["PP1"],
        what: "Members are automatically notified when new resources are published that match their role or enrolled programs — bringing relevant content to them rather than requiring them to check the library.",
        detail: "The resource library has value only if members know what is in it. Proactive notifications about new relevant content drives library engagement without requiring members to remember to check." },
      { task: "Renewal Reminder Sequence", hrs: 10, cost: 2500, gaps: ["experience"], pps: ["PP4"],
        what: "Automated renewal reminder emails are sent at defined intervals before renewal dates, with links to relevant renewal resources and EIIA contacts — ensuring no renewal catches a member by surprise.",
        detail: "Renewal surprises are relationship-damaging. A structured reminder sequence keeps members informed and demonstrates that EIIA is proactively managing the relationship — not waiting for the member to remember." },
      { task: "Branded Email Template Expansion (Mailgun)", hrs: 10, cost: 2500, gaps: ["experience"], pps: ["PP5"],
        what: "We expand the Phase 1 Mailgun template library to cover all new Phase 2 automated communication types — ensuring every new automated touchpoint matches EIIA's professional brand standards.",
        detail: "Phase 2 introduces multiple new automated communication types. Each one needs a professional template that looks and reads like it came from EIIA. This expansion ensures no automated email reverts to unbranded system defaults." },
      { task: "Communication Automation QA", hrs: 10, cost: 2500, gaps: ["experience"], pps: ["PP5"],
        what: "A full QA pass of all Phase 2 automated sequences — trigger reliability, content accuracy, role-based routing, and unsubscribe compliance — before any member receives a Phase 2 automated communication.",
        detail: "Automated communications that fire incorrectly, contain wrong information, or reach the wrong audience are worse than no automation. This QA pass is the final gate before any Phase 2 sequence goes live." },
    ],
  },
  {
    name: "Operational Integration & Workflow", total: 16000, hrs: 64,
    tasks: [
      { task: "Waiver Status in Institutional Admin Dashboard", hrs: 16, cost: 4000, gaps: ["experience"], pps: ["PP7"],
        what: "Institution administrators can see the live waiver status for their students in their portal dashboard — without contacting EIIA staff for a report.",
        detail: "'How many of our students have waivers approved?' is one of the most common institutional administrator questions. A live dashboard answers it without consuming EIIA staff time." },
      { task: "COI Request Processing Automation", hrs: 14, cost: 3500, gaps: ["experience"], pps: ["PP3"],
        what: "Certificate of Insurance requests submitted via portal are automatically routed to the appropriate EIIA staff member with confirmation sent to the requester — without manual email routing.",
        detail: "COI requests are a high-volume, routine transaction that currently goes through email. Portal-based submission with automated routing makes the process faster, more reliable, and trackable." },
      { task: "CRM to Data Warehouse Sync — Phase 2 Fields", hrs: 12, cost: 3000, gaps: ["visibility"], pps: ["PP6"],
        what: "We extend the Data Warehouse sync to include Phase 2 CRM fields and validate that all reporting pulls from accurate, up-to-date data.",
        detail: "Phase 2 adds new CRM fields that need to flow to the Data Warehouse for reporting. This sync update ensures the reporting layer stays current with the expanded CRM configuration." },
      { task: "Integration QA & Regression Testing", hrs: 22, cost: 5500, gaps: ["risk"], pps: ["PP8"],
        what: "A full QA pass of all Phase 2 integrations, plus regression testing to confirm that Phase 1 functionality is unaffected by Phase 2 additions.",
        detail: "New integrations can break existing ones in ways that are not immediately obvious. Regression testing ensures that Phase 2 additions do not create Phase 1 problems." },
    ],
  },
  {
    name: "Reporting & Analytics Access", total: 26000, hrs: 104,
    tasks: [
      { task: "Power BI Embeds in Member Portal", hrs: 26, cost: 6500, gaps: ["visibility"], pps: ["PP6"],
        what: "Selected Power BI reports are embedded directly in the member portal for eligible member users — with role-based access controls ensuring each institution sees only their own data.",
        detail: "Members who can see their own program data in the portal have a reason to log in regularly. Embedded Power BI reports make EIIA's analytical capabilities visible and accessible to the members who benefit from them most." },
      { task: "Staff Member Engagement Dashboard", hrs: 20, cost: 5000, gaps: ["findability"], pps: ["PP1"],
        what: "An internal dashboard showing which members are active in the portal, what they are searching for, what they cannot find, and which resources are most accessed — giving staff actionable intelligence about member behavior.",
        detail: "Staff who can see member engagement patterns can proactively reach out to institutions with low engagement, identify content gaps, and tailor outreach. Visibility into behavior is visibility into relationship health." },
      { task: "Prospect Pipeline Analytics", hrs: 14, cost: 3500, gaps: ["visibility"], pps: ["PP6"],
        what: "Conversion rates, time to close, source attribution, and nurture sequence performance are visible in CRM — connecting marketing automation to measurable business outcomes.",
        detail: "Marketing automation without analytics is automation that cannot be improved. Pipeline analytics give Doug and Jan the data to understand which channels and messages are converting prospects." },
      { task: "Search Analytics Expansion", hrs: 12, cost: 3000, gaps: ["findability"], pps: ["PP1"],
        what: "We build on Phase 1 search telemetry by adding AI query logging, failed query trending, resource gap identification, and taxonomy effectiveness scoring.",
        detail: "Phase 2 adds AI search queries to the analytics picture. Understanding how members use the AI assistant — and where it fails — is the input for continuous improvement of both the AI and the underlying resource library." },
      { task: "Renewal Readiness Dashboard", hrs: 16, cost: 4000, gaps: ["visibility"], pps: ["PP6"],
        what: "A staff-facing view of upcoming renewals, outstanding member requirements, and open items per institution — giving the team a proactive view of relationship health before renewal conversations begin.",
        detail: "Renewals managed reactively — responding when a member raises concerns — are renewals at risk. A proactive renewal readiness dashboard gives the team time to address issues before they become renewal barriers." },
      { task: "Reporting QA & Data Validation", hrs: 16, cost: 4000, gaps: ["risk"], pps: ["PP8"],
        what: "A validation pass of all dashboard data against source systems — confirming Power BI reports pull correctly from the Data Warehouse after Phase 2 sync changes.",
        detail: "Dashboards that display incorrect data are worse than no dashboards — they create false confidence in decisions made on bad information. This validation ensures every report reflects reality." },
    ],
  },
  {
    name: "Sports Census & Athletic Reporting", total: 8750, hrs: 35,
    tasks: [
      { task: "Sports Census Data Collection Workflow", hrs: 20, cost: 5000, gaps: ["experience"], pps: ["PP7"],
        what: "A portal-based annual census workflow where institutional administrators submit athletic program data — sports offered, participant counts, division levels, facility inventory — through a structured form rather than spreadsheets or email.",
        detail: "The current sports census process relies on manual data collection that is difficult to standardize across 125+ institutions. A structured portal-based workflow ensures consistent data formats, reduces administrative burden, and feeds directly into CRM and carrier reporting." },
      { task: "Sports Census Reporting & Carrier Integration", hrs: 15, cost: 3750, gaps: ["risk", "visibility"], pps: ["PP8", "PP6"],
        what: "Year-over-year comparison dashboards for athletic program data and standardized carrier reporting outputs. Census data flows from submission to CRM to carrier-ready export without manual spreadsheet preparation.",
        detail: "Athletic program data is a key input for carrier underwriting and pricing. Automating the path from institutional submission to carrier-ready report removes a recurring manual burden while improving data accuracy. Discussion needed: confirm specific data points, carrier format requirements, and current process details with Jan and Krista." },
    ],
  },
];

// ─── PHASE 3 ─────────────────────────────────────────────────────────────────

const PHASE3_BUCKETS = [
  {
    name: "Eligibility Management System", total: 85000, hrs: 340,
    tasks: [
      { task: "EMS Architecture & Technical Specification", hrs: 26, cost: 6500, gaps: ["risk"], pps: ["PP8"],
        what: "Before any development begins on the most complex item in the entire roadmap, we produce a complete technical specification — data model, workflow engine, integration points with CRM, Blob Storage, and carrier systems.",
        detail: "The EMS is effectively a net-new software application. Building without a specification at this scale and complexity creates the kind of technical debt that makes future changes expensive and risky." },
      { task: "Roster Intake Engine — Multi-Format/Multi-Source", hrs: 46, cost: 11500, gaps: ["risk", "experience"], pps: ["PP8", "PP7"],
        what: "The system can ingest eligibility rosters from any file format and delivery method — SFTP, direct upload, API — and handles daily updates from institutions like Southwestern that submit changes frequently.",
        detail: "Institutions send eligibility data in every format imaginable. A roster intake engine that handles all of them removes the manual reconciliation work that currently happens every time a new institution's format does not match expectations." },
      { task: "Eligibility Rules Engine — Full Phase 3 Version", hrs: 60, cost: 15000, gaps: ["risk", "experience"], pps: ["PP8", "PP7"],
        what: "The complete institution-specific eligibility rules engine — every standard case automated, every exception handled by a defined workflow, every institution's unique requirements encoded and enforced without manual review.",
        detail: "This is the item Jan Pearson described wanting most in discovery. A rules engine that knows every institution's eligibility criteria means standard submissions are processed automatically and staff time is reserved for genuinely complex cases." },
      { task: "Eligibility Comparison Engine", hrs: 42, cost: 10500, gaps: ["risk"], pps: ["PP8"],
        what: "Submitted student data is automatically compared against the current eligibility roster. Mismatches, duplicates, and ineligible submissions are identified and flagged without any manual cross-referencing.",
        detail: "Manual eligibility comparison using spreadsheets is error-prone and does not scale. An automated comparison engine catches every discrepancy instantly — before it becomes a compliance or carrier issue." },
      { task: "Add/Drop Lifecycle Management", hrs: 38, cost: 9500, gaps: ["experience", "risk"], pps: ["PP7", "PP8"],
        what: "The full adds and drops lifecycle is managed by the system — student requests a change, eligibility is verified, carrier is notified, confirmation is issued — without staff intervention for standard cases.",
        detail: "Adds and drops are among the most operationally intensive activities in the student program. Full lifecycle management returns significant staff hours during peak periods while reducing the error rate on carrier notifications." },
      { task: "Carrier Export Engine — Automated File Generation", hrs: 30, cost: 7500, gaps: ["risk"], pps: ["PP8"],
        what: "Carrier-formatted enrollment and change files are generated automatically from the EMS — in the exact format each carrier requires — replacing the manual spreadsheet preparation that currently happens before every carrier submission.",
        detail: "Carrier export formats are different for every carrier and change periodically. An automated export engine that generates the correct format from a single source of truth eliminates both the manual effort and the format error risk." },
      { task: "Audit Trail & FERPA Compliance Logging", hrs: 20, cost: 5000, gaps: ["risk"], pps: ["PP8"],
        what: "Every eligibility decision made by the EMS is logged with a complete audit trail — who, what, when, and why — in a FERPA-compliant format that can be exported for compliance review or carrier dispute resolution.",
        detail: "In a compliance-sensitive environment, the ability to reconstruct exactly what happened with any student record is not optional. This audit trail is the proof layer that protects EIIA in any dispute or regulatory review." },
      { task: "EMS Admin Interface — Staff Review Tools", hrs: 36, cost: 9000, gaps: ["experience"], pps: ["PP7"],
        what: "A staff-facing interface for reviewing exception cases, overriding automated decisions where appropriate, and managing institution-specific rule configurations — without requiring developer access to make changes.",
        detail: "An automated system without a staff interface for managing exceptions is a system that creates bottlenecks whenever something unusual happens. This interface gives Krista and Jan's teams the control they need over edge cases." },
      { task: "EMS QA & Parallel Testing with Live Process", hrs: 42, cost: 10500, gaps: ["risk"], pps: ["PP8"],
        what: "The EMS runs in parallel with the existing manual process for a defined period — both produce outputs, both are compared — before the manual process is retired. The EMS goes live only after parallel validation confirms accuracy.",
        detail: "For a system this consequential — one that determines student enrollment status and triggers carrier notifications — parallel testing is not optional. It is the only responsible way to validate that the system is accurate before it becomes the system of record." },
    ],
  },
  {
    name: "Institutional Admin Console", total: 33000, hrs: 132,
    tasks: [
      { task: "Institutional Admin Portal Design", hrs: 26, cost: 6500, gaps: ["experience"], pps: ["PP7"],
        what: "A purpose-built self-service interface designed for campus administrators — a role distinct from member portal users — focused entirely on student program management rather than P&C coverage.",
        detail: "Campus administrators are a distinct user type with distinct needs. A self-service console designed for their specific tasks removes the need for them to navigate a portal built for a completely different role." },
      { task: "Roster Upload Interface — Format Validation", hrs: 20, cost: 5000, gaps: ["risk", "experience"], pps: ["PP8", "PP7"],
        what: "Campus administrators upload eligibility files directly via the console with immediate format validation on upload. They know within seconds whether the file was accepted — not days later when EIIA staff review it.",
        detail: "Roster uploads that fail silently create a delay between submission and discovery that can affect student eligibility timelines. Immediate validation catches format errors at the point of upload, when they are easiest to fix." },
      { task: "Enrollment & Waiver Status Reporting", hrs: 18, cost: 4500, gaps: ["experience"], pps: ["PP7"],
        what: "Campus administrators see live enrollment status, waiver acceptance rates, and pending exceptions for their students — without emailing EIIA for a report.",
        detail: "'How many of our students have completed waivers?' should not require an email and a wait. Live status reporting makes this information available on demand for every campus administrator." },
      { task: "Self-Service Adds & Drops via Console", hrs: 22, cost: 5500, gaps: ["experience"], pps: ["PP7"],
        what: "Campus administrators submit add and drop requests directly through the console. The requests flow into the EMS for processing and status is visible in the console without following up with EIIA.",
        detail: "Add and drop requests currently go through EIIA staff via email or phone. Console-based self-service makes the process faster for campuses and removes a significant volume of routine transactions from EIIA's queue." },
      { task: "Document Download Center — Per Institution", hrs: 12, cost: 3000, gaps: ["findability"], pps: ["PP1"],
        what: "Every institution-specific document — policy brochures, ID card links, enrollment forms, carrier contacts — is available in one place in the console, filtered to that institution's specific program.",
        detail: "Campus administrators currently have to contact EIIA to get documents they should be able to access themselves. A per-institution document center removes that dependency entirely." },
      { task: "Communication Preferences & Notification Settings", hrs: 10, cost: 2500, gaps: ["experience"], pps: ["PP5"],
        what: "Campus administrators set their preferences for which automated notifications they receive — waiver reminders, renewal alerts, status updates — in a simple settings panel within the console.",
        detail: "Communication preferences give campus administrators control over how EIIA communicates with them rather than subjecting all administrators to the same notification volume regardless of their needs." },
      { task: "Console QA & Institution Pilot (3–5 Schools)", hrs: 24, cost: 6000, gaps: ["experience"], pps: ["PP7"],
        what: "We pilot the console with 3–5 willing member institutions before full rollout — collecting real usage feedback, refining the experience, and validating that the workflows work correctly across different institution configurations.",
        detail: "A pilot with real institutions surfaces usability issues that internal testing never finds. Feedback from actual campus administrators before full rollout ensures the console works the way they need it to — not just the way it was designed to." },
    ],
  },
  {
    name: "Personalized Member Experience", total: 31000, hrs: 124,
    tasks: [
      { task: "Role-Based Homepage Personalization", hrs: 22, cost: 5500, gaps: ["experience", "findability"], pps: ["PP3", "PP4"],
        what: "Each member role sees a fully personalized dashboard default view on login — the panels, quick links, and content that are most relevant to a Risk Manager are different from those for a Board Member or Student Administrator.",
        detail: "A portal that shows everyone the same thing forces every member to customize their own experience or navigate past irrelevant content every time they log in. Role-based defaults do that work automatically." },
      { task: "Institution-Specific Content Surfacing", hrs: 18, cost: 4500, gaps: ["findability"], pps: ["PP1"],
        what: "The portal automatically surfaces resources relevant to a member's enrolled programs. A student-only institution does not see P&C resources. A P&C-only institution does not see student program content.",
        detail: "Showing every member every resource regardless of relevance adds noise that makes finding the right content harder. Automatic filtering by program enrollment makes the resource library feel smaller and more useful for every individual member." },
      { task: "Behavioral Personalization Engine", hrs: 28, cost: 7000, gaps: ["findability"], pps: ["PP1"],
        what: "The portal learns from individual usage patterns over time — frequently accessed resources are promoted, recently viewed content resurfaces on return visits, and the experience improves the more a member uses it.",
        detail: "A portal that is equally useful on the first visit and the hundredth visit is a portal that is not getting smarter. Behavioral personalization means the portal becomes more valuable the more it is used." },
      { task: "Institution Health Dashboard — Member-Facing", hrs: 22, cost: 5500, gaps: ["visibility", "experience"], pps: ["PP6", "PP3"],
        what: "A member-facing summary of their institution's relationship with EIIA — renewal status, service plan completion, open claims, resource usage — giving them the view that Doug currently has in CRM.",
        detail: "Members who can see their own relationship health with EIIA are more engaged and less likely to be surprised at renewal. This dashboard makes the partnership visible to both sides." },
      { task: "AI-Driven Personalized Resource Recommendations", hrs: 22, cost: 5500, gaps: ["findability"], pps: ["PP1"],
        what: "Alongside any resource viewed, the AI surfaces related recommendations based on role, institution type, and prior behavior — not static manually-maintained tags.",
        detail: "Static related resource suggestions become stale and miss connections that behavioral data would surface. AI-driven recommendations improve continuously as the resource library and usage data grow." },
      { task: "Personalization QA & Privacy Review", hrs: 12, cost: 3000, gaps: ["risk"], pps: ["PP8"],
        what: "A validation pass ensuring personalization data is handled correctly — no cross-institution data leakage, proper opt-out mechanisms, and FERPA-compliant handling of any student-related behavioral data.",
        detail: "Personalization that exposes one institution's data to another, or that handles student behavioral data without FERPA compliance, creates legal exposure. This review is the gate that ensures personalization is safe as well as useful." },
    ],
  },
  {
    name: "Thought Leadership & Content Platform", total: 21000, hrs: 84,
    tasks: [
      { task: "Content Strategy & Editorial Calendar", hrs: 10, cost: 2500, gaps: ["visibility"], pps: ["PP6"],
        what: "We define content pillars, publishing cadence, authorship assignments, and the approval workflow — giving Emily's team a structured content operation rather than an ad hoc publishing process.",
        detail: "Content published without a strategy produces content that does not move the needle on the perception gap. A defined editorial calendar ensures that every piece published is working toward a specific goal." },
      { task: "Author Profile System in CMS", hrs: 8, cost: 2000, gaps: ["visibility"], pps: ["PP6"],
        what: "Named author profiles for Greg, Doug, Jan, and Dave Dietz are built into the CMS — with bios, photos, and credentials — so that published thought leadership is attributed to real people, not to 'EIIA Staff'.",
        detail: "Thought leadership attributed to real, credentialed people carries more authority than content attributed to an organization. Greg Logan's expertise as a named author on a risk management article is a fundamentally different credential than 'EIIA Team'." },
      { task: "Case Study Template & Production Workflow", hrs: 12, cost: 3000, gaps: ["visibility"], pps: ["PP6"],
        what: "A standardized case study format and a production workflow including member sign-off and approval steps — targeting an initial library of 6–10 case studies at platform launch.",
        detail: "Case studies are the most credible content EIIA can publish. A member institution describing how EIIA helped them navigate a specific risk situation is more persuasive than any marketing copy. The template and workflow make production repeatable." },
      { task: "Research & White Paper Publication System", hrs: 10, cost: 2500, gaps: ["visibility"], pps: ["PP6"],
        what: "A template and workflow for longer-form published research — hosted on eiia.org, gated or ungated based on audience — positioning EIIA as an intellectual authority in the higher education insurance space.",
        detail: "United Educators publishes research. EIIA has the institutional knowledge and member data to do the same. A white paper publication system creates the infrastructure for EIIA to enter that conversation." },
      { task: "Webinar Archive & On-Demand Library", hrs: 12, cost: 3000, gaps: ["visibility", "findability"], pps: ["PP6", "PP1"],
        what: "All past webinars are archived, tagged by topic, and searchable — with public and member-gated versions where appropriate — so a single webinar continues generating value long after the live event.",
        detail: "Webinars that disappear after the live date represent significant lost value. An on-demand library makes every webinar a persistent asset that prospects and members can find when the topic becomes relevant to them." },
      { task: "External Publication Integration", hrs: 6, cost: 1500, gaps: ["visibility"], pps: ["PP6"],
        what: "Articles published by EIIA in higher education trade publications are linked back to eiia.org with clear authorship credit — building domain authority and surfacing EIIA in the channels where prospects already look for expertise.",
        detail: "External publications drive traffic to eiia.org from audiences who would not otherwise find it. Each external article with a byline and link back to EIIA is a credibility signal in a channel beyond EIIA's own website." },
      { task: "SEO Content Program Setup", hrs: 16, cost: 4000, gaps: ["visibility"], pps: ["PP6"],
        what: "We establish an ongoing SEO-optimized content program targeting search terms relevant to small private higher education insurance — positioning eiia.org to capture organic search traffic from prospects who are actively looking for what EIIA offers.",
        detail: "Prospects who find EIIA through an organic search for 'higher education insurance for small colleges' are already qualified. An SEO content program puts EIIA in that conversation at the moment of need." },
      { task: "Content Analytics Configuration", hrs: 10, cost: 2500, gaps: ["visibility"], pps: ["PP6"],
        what: "Page views, time on page, PDF downloads, and prospect conversion from content pages are tracked and surfaced in a dashboard — connecting content investment to measurable business outcomes.",
        detail: "A content program without analytics is a program that cannot be optimized. Connecting content performance to prospect conversion gives Emily's team the data to invest content effort where it is actually generating results." },
    ],
  },
  {
    name: "Member Community & Network", total: 32000, hrs: 128,
    tasks: [
      { task: "Community Architecture & Governance Design", hrs: 16, cost: 4000, gaps: ["experience"], pps: ["PP4"],
        what: "We define what the community is, how it is moderated, what members can share, and how EIIA maintains quality control — directly addressing Greg Logan's concern about members sharing incorrect compliance information.",
        detail: "A member community without governance is a liability. A member community with clear governance, EIIA moderation, and defined rules for what can and cannot be shared is a genuine differentiator that no broker or carrier can replicate." },
      { task: "Peer Benchmarking Tools — Anonymous Comparison", hrs: 30, cost: 7500, gaps: ["visibility"], pps: ["PP6"],
        what: "Members can compare their institution's risk metrics, claim rates, and service plan completion against anonymized data from similar institutions — giving them a view of how they perform relative to their peers.",
        detail: "Peer benchmarking gives members a reason to log into the portal that has nothing to do with a task they need to complete. It is also one of the most valuable insights EIIA can offer that no external vendor can replicate." },
      { task: "Consortium Communications Platform", hrs: 26, cost: 6500, gaps: ["experience"], pps: ["PP4"],
        what: "An EIIA-moderated member-to-member communications channel within the portal — replacing informal conference networking with a year-round, structured peer connection platform.",
        detail: "The relationships that form at the annual member conference are one of EIIA's most underappreciated retention drivers. A consortium communications platform extends those relationships to every week of the year." },
      { task: "Member Conference Digital Extension", hrs: 18, cost: 4500, gaps: ["experience", "visibility"], pps: ["PP4", "PP6"],
        what: "Pre-conference resource sharing, agenda access, and post-conference follow-up materials are all hosted in the portal — extending the annual conference from a single event into a year-round touchpoint.",
        detail: "The conference matters to members. A digital extension that keeps conference content accessible and connects conference conversations to ongoing portal engagement makes the membership investment more visible throughout the year." },
      { task: "Shared Resource Contributions Workflow", hrs: 12, cost: 3000, gaps: ["findability"], pps: ["PP1"],
        what: "Members can submit resources for EIIA review and potential publication in the resource library — building community ownership of the content and reducing EIIA's sole responsibility for library growth.",
        detail: "Member institutions have institutional knowledge that EIIA does not — specific risk scenarios, compliance solutions, program innovations. A structured contribution workflow captures that knowledge and makes it available to the whole consortium." },
      { task: "Member Directory — Opt-In Peer Network", hrs: 14, cost: 3500, gaps: ["experience"], pps: ["PP4"],
        what: "An opt-in contact directory that lets risk managers find and connect with counterparts at similar institutions — for peer advice, reference checks, and informal benchmarking.",
        detail: "One of the most common informal uses of the EIIA conference is finding peers at similar institutions. A year-round directory makes that connection available on demand rather than once a year." },
      { task: "Community QA & Moderation Workflow", hrs: 12, cost: 3000, gaps: ["risk"], pps: ["PP8"],
        what: "Full QA of community features, moderation workflow training for EIIA staff, and a pilot with the advisory council before full member rollout.",
        detail: "A community platform that launches without tested moderation workflows is a platform that will have problems within weeks. This QA and pilot phase ensures EIIA staff are prepared to manage the community before it opens to all members." },
    ],
  },
  {
    name: "AI Maturity & Prediction", total: 49000, hrs: 196,
    tasks: [
      { task: "Internal CRM Copilot — Institutional Briefs", hrs: 40, cost: 10000, gaps: ["visibility"], pps: ["PP6"],
        what: "Before a campus visit, Greg or Doug can ask the AI to generate an institutional brief — recent claims, open items, service plan status, prior interaction history — synthesized from CRM data into a readable summary.",
        detail: "Preparing for a campus visit currently requires manually reviewing multiple CRM records, activity logs, and reports. An AI-generated brief synthesizes all of that in seconds — so every campus visit begins with full institutional context." },
      { task: "Visit Summary Automation", hrs: 20, cost: 5000, gaps: ["visibility"], pps: ["PP6"],
        what: "After a campus visit is logged in CRM, the AI generates a structured visit summary draft for staff review and approval — reducing the time required to document interactions.",
        detail: "CRM logging is consistently cited as something that does not get done because it takes too long. AI-generated draft summaries dramatically reduce the effort required — making comprehensive interaction logging a realistic expectation rather than an aspirational one." },
      { task: "Eligibility Anomaly Detection", hrs: 36, cost: 9000, gaps: ["risk"], pps: ["PP8"],
        what: "An AI layer on top of the EMS that flags unusual patterns in eligibility data — duplicate IDs, unusual waiver rates, format anomalies — before they create downstream problems.",
        detail: "Anomalies in eligibility data that go undetected can result in incorrect carrier notifications, coverage disputes, or FERPA violations. AI-powered detection catches patterns that rule-based systems miss." },
      { task: "Predictive Waiver Analysis", hrs: 30, cost: 7500, gaps: ["experience"], pps: ["PP7"],
        what: "The system predicts which students are likely to waive based on prior year data and institutional patterns — helping Jan and Krista's teams resource-plan before waiver season opens.",
        detail: "Waiver season workload is predictable in aggregate but surprises at the institution level. Predictive analysis gives the team advance visibility into which institutions will generate high volumes so they can plan accordingly." },
      { task: "AI-Generated Institutional Summaries from Data Warehouse", hrs: 36, cost: 9000, gaps: ["visibility"], pps: ["PP6"],
        what: "Board-level and leadership summaries are generated from Data Warehouse data — translating Srini's Power BI reports into plain-language narratives for non-technical stakeholders who need the insight without the dashboard.",
        detail: "Power BI reports require the reader to interpret them. An AI-generated narrative that says 'three institutions are at renewal risk based on engagement patterns and open service plan items' is actionable for leadership without requiring analytical expertise." },
      { task: "AI Scope Expansion Review & Governance Update", hrs: 10, cost: 2500, gaps: ["risk"], pps: ["PP8"],
        what: "An annual review of AI capabilities against Greg Logan's compliance guardrails — determining whether expanded AI scope beyond resource discovery is appropriate and documenting the decision with EIIA leadership sign-off.",
        detail: "AI capabilities evolve. The guardrails established need to be reviewed annually against what the AI can now do — and any expansion of scope requires explicit leadership approval rather than happening incrementally without oversight." },
      { task: "AI QA, Compliance Audit & Annual Model Review", hrs: 24, cost: 6000, gaps: ["risk"], pps: ["PP8"],
        what: "An annual audit of all AI systems — validating that governance frameworks are enforced, reviewing query logs for compliance issues, and updating content classifications as the resource library evolves.",
        detail: "AI systems deployed without ongoing audits drift from their original guardrails. An annual review ensures every AI feature across the platform continues to operate within the governance framework EIIA approved." },
    ],
  },
];

// ─── BUCKET META (for overview expandable rows) ──────────────────────────────

const BUCKET_META = {
  "Public Website Redesign": {
    what: "A ground-up rebuild of eiia.org — mobile-first, story-first, and built to convert visitors into members rather than simply describe what EIIA offers. Includes full WCAG 2.1 AA accessibility compliance and contact form routing directly to CRM.",
    supports: "The current site describes EIIA without proving it. A prospect who visits today cannot easily find the retention rate, the founding story, or a single case study. This rebuild makes 50 years of proof visible before anyone picks up the phone.",
    gaps: ["visibility", "experience"], pps: ["PP6", "PP7"],
  },
  "Member Portal Rebuild": {
    what: "A complete rebuild of the member-facing portal — one unified login, role-based dashboards, a working resource library, governance access, and a structured onboarding flow for new users.",
    supports: "The dashboard vs. portal confusion, the lack of onboarding, the one-size-fits-none navigation — all daily friction points that erode trust before a member ever experiences EIIA's expertise. This rebuild removes every one of them.",
    gaps: ["experience", "findability"], pps: ["PP1", "PP3", "PP4"],
  },
  "Identity, Auth & SSO": {
    what: "Replacement of the current identity infrastructure with Azure AD B2C — fixing broken MFA, eliminating the two-path account creation problem, syncing portal permissions from CRM, and enabling seamless SSO to Origami Risk.",
    supports: "The first experience every new member has is trying to log in. Right now that experience involves a phone format error, a broken account creation path, and a welcome email that looks like spam. This bucket fixes all three.",
    gaps: ["experience"], pps: ["PP2", "PP3", "PP5"],
  },
  "Search & Resource Library": {
    what: "Replacement of WordPress native search with Elasticsearch — including PDF full-text indexing, permission-aware results, natural language processing, a governed taxonomy, and a unified search bar across both public site and member portal.",
    supports: "Search is the single largest driver of member support calls. Members try to find things, fail, and call staff instead. This bucket addresses all five documented search failures simultaneously.",
    gaps: ["findability"], pps: ["PP1"],
  },
  "Secure Data & Forms": {
    what: "Separation of student PII from the public-facing web server, routing of form data directly to CRM via API, file uploads to Azure Blob Storage, FERPA-compliant waiver data handling, Zyx replacement via Azure Blob secure links, and a post-implementation security audit.",
    supports: "Student PII on a public-facing web server is the most serious technical risk in the current architecture. This bucket resolves a live security exposure that has no acceptable timeline for deferral. It also fully replaces the retiring Zyx file delivery tool.",
    gaps: ["risk"], pps: ["PP8"],
  },
  "CRM Optimization": {
    what: "Configuration of Dynamics 365 as the genuine system of record — prospect pipeline, member permissioning sync, Origami provisioning automation, campus visit logging, service plan tracking, file centralization, and usage standards that give the CRM real institutional memory.",
    supports: "EIIA has a CRM. The team's own words in discovery were 'we're just not using it.' This bucket connects CRM to every digital entry point, establishes CRM as the single source of truth for files and documents, and gives the team the pipeline visibility and automation they need.",
    gaps: ["visibility"], pps: ["PP5", "PP6"],
  },
  "Student Experience — Phase 1+": {
    what: "The highest-priority student automation items pulled forward from Phase 2 — automated waiver reminders, admin-managed auto-approval logic, annual reset automation, adds and drops processing, roster comparison, carrier export templates, and QA.",
    supports: "These are the items EIIA's student team identified as essential for the Phase 1 launch. They reduce the manual operational burden on Krista and Jan's teams immediately rather than waiting for Phase 2, and they build on the secure waiver infrastructure already in Phase 1.",
    gaps: ["experience", "risk"], pps: ["PP7", "PP8"],
  },
  "Operational Integration": {
    what: "The integration layer that connects Phase 1 systems — Power Automate for form routing, Origami to CRM data feed, Data Warehouse sync, and integration QA.",
    supports: "Systems built in Phase 1 that do not talk to each other require humans to bridge them. This bucket eliminates the manual handoffs and ensures data flows automatically from where it is created to where it is needed.",
    gaps: ["visibility", "risk"], pps: ["PP6", "PP8"],
  },
  "AI Foundation": {
    what: "The infrastructure layer that makes AI features possible — content classification governance, vector embedding infrastructure on top of Elasticsearch, and failed query logging as the training signal for the AI resource assistant.",
    supports: "AI cannot be built in a day. This foundation ensures the infrastructure, governance framework, and data are in place before any member-facing AI feature is activated — so AI features can move fast without cutting compliance corners.",
    gaps: ["findability", "risk"], pps: ["PP1", "PP8"],
  },
  "Student Experience Automation": {
    what: "The Phase 2 student automation items — waiver status dashboard, pre-populated returning student data, eligibility rules engine admin UI enhancement, international student experience redesign, and end-to-end QA.",
    supports: "Phase 1 builds the student automation foundation and handles the highest-priority items. Phase 2 adds the student-facing visibility layer and the admin efficiency improvements that make the system genuinely self-service.",
    gaps: ["experience", "risk"], pps: ["PP7", "PP8"],
  },
  "Prospect & Marketing Automation": {
    what: "A structured automated prospect management system — nurture sequences, pipeline stage automation, lead scoring, and webinar workflows that turn a contact form submission into a managed prospect relationship.",
    supports: "EIIA's prospect process currently depends on someone manually following up on every inquiry. This automation creates a pipeline that runs consistently — ensuring no prospect is forgotten regardless of how busy the team is.",
    gaps: ["visibility"], pps: ["PP6"],
  },
  "Intelligent Search & AI Expansion": {
    what: "The payoff of the AI Foundation — a member-facing conversational resource assistant that understands natural language questions and escalates to the right staff member when a question exceeds its scope.",
    supports: "A member who types 'what do I do if a student gets hurt at an off-campus event?' gets the right liability resources — not a list of keyword matches. This makes EIIA's 1,200-resource library feel effortless to use for the first time.",
    gaps: ["findability"], pps: ["PP1"],
  },
  "Member Communication Automation": {
    what: "A structured automated communication layer — welcome sequences, governance alerts, claims status notifications, resource update notifications, and renewal reminders — that makes every touchpoint feel intentional.",
    supports: "Automated communications that look unbranded or arrive at the wrong time undermine the relationship EIIA is building. This automation ensures every member touchpoint is professionally branded, role-appropriate, and timed correctly.",
    gaps: ["experience"], pps: ["PP4", "PP5"],
  },
  "Operational Integration & Workflow": {
    what: "The Phase 2 operational work — waiver status in institutional admin dashboards, COI request automation, Data Warehouse sync for Phase 2 fields, and integration QA.",
    supports: "Phase 2 integrations extend the Phase 1 foundation. This bucket ensures new data flows and workflows are connected properly and that Phase 1 functionality is preserved through regression testing.",
    gaps: ["risk"], pps: ["PP8"],
  },
  "Reporting & Analytics Access": {
    what: "Power BI embeds in the member portal, a staff engagement dashboard, prospect pipeline analytics, search analytics expansion, and renewal readiness tracking.",
    supports: "Data that requires a staff member to generate and share a report is data that does not get used. Embedded dashboards and automated reporting make institutional intelligence available in real time to the people who need it.",
    gaps: ["visibility"], pps: ["PP6"],
  },
  "Sports Census & Athletic Reporting": {
    what: "A portal-based annual census workflow for athletic program data — structured submission, CRM integration, year-over-year comparison, and carrier-ready reporting outputs.",
    supports: "The current sports census process relies on manual data collection via spreadsheets. A structured portal workflow ensures consistent data, reduces admin burden, and feeds directly into carrier reporting. Discussion needed: confirm data points, carrier requirements, and current process with Jan and Krista.",
    gaps: ["experience", "risk"], pps: ["PP7", "PP8"],
  },
  "Eligibility Management System": {
    what: "A purpose-built eligibility management application — the highest-value and highest-complexity item on the entire roadmap — replacing spreadsheet-based tracking with automated roster intake, rules-based processing, and direct carrier export.",
    supports: "No other vendor in EIIA's niche is offering this. An EMS that handles roster intake, eligibility rules, adds and drops, and carrier exports automatically removes the largest single operational burden in the student program — and makes EIIA genuinely irreplaceable.",
    gaps: ["risk", "experience"], pps: ["PP7", "PP8"],
  },
  "Institutional Admin Console": {
    what: "A self-service portal for campus administrators focused entirely on student program management — roster uploads, enrollment status, waiver reporting, adds and drops, and institution-specific documents.",
    supports: "'How many of our students have completed waivers?' should not require an email to EIIA. The console gives campus staff the visibility and self-service capability to manage their program without consuming EIIA staff time for routine questions.",
    gaps: ["experience"], pps: ["PP7"],
  },
  "Personalized Member Experience": {
    what: "Role-based homepage personalization, institution-specific content surfacing, a behavioral personalization engine, an institution health dashboard, and AI-driven resource recommendations.",
    supports: "A portal that shows every member the same thing serves no one optimally. Personalization makes the portal feel built for each individual member — surfacing what they need before they search and improving the more they use it.",
    gaps: ["findability", "experience"], pps: ["PP1", "PP3"],
  },
  "Thought Leadership & Content Platform": {
    what: "A structured content operation — editorial calendar, named author profiles for Greg, Doug, and Jan, case study templates, white paper publishing, webinar archives, external publication integration, and an SEO content program.",
    supports: "Greg Logan said it directly: the content is equivalent to United Educators. The presentation is not. This platform gives EIIA the infrastructure to publish that content consistently, attribute it to real experts, and make it findable by prospects who are actively searching.",
    gaps: ["visibility"], pps: ["PP6"],
  },
  "Member Community & Network": {
    what: "A governed, EIIA-moderated member community — peer benchmarking tools, a consortium communications platform, conference digital extensions, shared resource contributions, and an opt-in member directory.",
    supports: "The peer relationships that form at the annual conference are one of EIIA's most underappreciated retention drivers. A year-round community platform digitizes those relationships and creates a network that no broker or carrier can replicate.",
    gaps: ["experience", "visibility"], pps: ["PP4", "PP6"],
  },
  "AI Maturity & Prediction": {
    what: "An internal CRM copilot that generates institutional briefs before campus visits, visit summary automation, eligibility anomaly detection, predictive waiver analysis, and AI-generated board summaries from Data Warehouse data.",
    supports: "Phase 3 AI moves from member-facing resource discovery to operational intelligence. The CRM copilot alone — generating a complete institutional brief before every campus visit — makes every member conversation more informed and more effective.",
    gaps: ["visibility", "risk"], pps: ["PP6", "PP8"],
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fmt(n) { return "$" + n.toLocaleString(); }

function EffortBar({ value, max, color }) {
  return (
    <div style={{ width: "120px", height: "6px", background: "#E8ECF0", borderRadius: "3px", overflow: "hidden" }}>
      <div style={{ width: `${Math.round((value / max) * 100)}%`, height: "100%", background: color, borderRadius: "3px" }} />
    </div>
  );
}

function PhaseBadge({ phase }) {
  const c = { 1: ORANGE, 2: NAVY, 3: TEAL };
  return <span style={{ fontSize: "9px", fontWeight: 700, color: c[phase], background: `${c[phase]}18`, padding: "2px 7px", borderRadius: "10px", whiteSpace: "nowrap" }}>P{phase}</span>;
}

function TypeBadge({ type }) {
  const isReq = type === "required";
  return (
    <span style={{
      fontSize: "8px", fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase",
      color: isReq ? NAVY : TEAL,
      background: isReq ? "#E8EDF4" : "#E8F4F5",
      border: `1px solid ${isReq ? NAVY : TEAL}30`,
      padding: "2px 7px", borderRadius: "10px", whiteSpace: "nowrap",
    }}>
      {isReq ? "Required" : "Enhancement"}
    </span>
  );
}

function ItemTypeBadge({ type }) {
  if (!type) return null;
  const isEnh = type === "enhancement";
  return (
    <span style={{
      fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase",
      color: isEnh ? TEAL : NAVY,
      background: isEnh ? "#E8F4F5" : "#E8EDF4",
      padding: "1px 5px", borderRadius: "6px", whiteSpace: "nowrap", marginLeft: "4px",
    }}>
      {isEnh ? "Enhancement" : "Required"}
    </span>
  );
}

function GapTag({ gap }) {
  const m = GAP_META[gap];
  return <span style={{ fontSize: "9px", fontWeight: 700, color: m.color, background: m.bg, padding: "2px 8px", borderRadius: "10px", whiteSpace: "nowrap", border: `1px solid ${m.color}30` }}>{m.label}</span>;
}

function PPTag({ pp }) {
  const m = PP_META[pp];
  return <span style={{ fontSize: "8.5px", fontWeight: 600, color: m.color, background: `${m.color}12`, padding: "2px 7px", borderRadius: "8px", whiteSpace: "nowrap", border: `1px solid ${m.color}20` }}>{m.label}</span>;
}

// ─── EXPANDABLE TASK ROW ──────────────────────────────────────────────────────

function TaskRow({ task, hrs, cost, what, supports, gaps, pps, color, phase, maxHrs, rowBg, itemType }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(o => !o)} style={{
        display: "grid", gridTemplateColumns: "1fr 90px 130px 70px 130px 28px",
        padding: "8px 16px", background: open ? `${color}08` : rowBg,
        borderBottom: "1px solid #EEF1F5", alignItems: "center",
        cursor: "pointer",
        transition: "background 0.15s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: open ? color : "#2A3A50", fontWeight: open ? 700 : 500, transition: "color 0.15s" }}>{task}</span>
          <ItemTypeBadge type={itemType} />
        </div>
        <div style={{ fontSize: "11px", color: "#4A5568", textAlign: "center" }}>{hrs} hrs</div>
        <div style={{ fontSize: "11px", fontWeight: 700, color: color, textAlign: "center" }}>{fmt(cost)}</div>
        <div style={{ textAlign: "center" }}><PhaseBadge phase={phase} /></div>
        <div><EffortBar value={hrs} max={maxHrs} color={color} /></div>
        <div style={{ textAlign: "center", color: color, fontSize: "12px", fontWeight: 700, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▾
        </div>
      </div>

      {open && what && (
        <div style={{ background: `${color}06`, borderBottom: "1px solid #EEF1F5", padding: "16px 20px 16px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "9px", fontWeight: 800, color: "#888", letterSpacing: "2px", marginBottom: "8px" }}>WHAT THIS IS</div>
              <p style={{ fontSize: "11.5px", color: "#333", lineHeight: 1.65, margin: 0 }}>{what}</p>
            </div>
            <div>
              <div style={{ fontSize: "9px", fontWeight: 800, color: "#888", letterSpacing: "2px", marginBottom: "8px" }}>HOW THIS SUPPORTS THE GOAL</div>
              <p style={{ fontSize: "11.5px", color: "#333", lineHeight: 1.65, margin: "0 0 12px 0" }}>{supports}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "6px" }}>
                {gaps.map(g => <GapTag key={g} gap={g} />)}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {pps.map(p => <PPTag key={p} pp={p} />)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── BUCKET TABLE ─────────────────────────────────────────────────────────────

function BucketTable({ bucket, phase }) {
  const color = BUCKET_COLORS[bucket.name] || NAVY;
  const maxHrs = Math.max(...bucket.tasks.map(t => t.hrs));
  const bType = BUCKET_TYPE[bucket.name];

  return (
    <div style={{ width: "100%", maxWidth: "900px" }}>
      <div style={{ background: color, padding: "12px 20px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ color: WHITE, fontWeight: 800, fontSize: "15px" }}>{bucket.name}</div>
            {bType && <span style={{
              fontSize: "8px", fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase",
              color: WHITE, background: "rgba(255,255,255,0.2)",
              padding: "2px 8px", borderRadius: "10px",
            }}>{bType === "required" ? "Required" : "Enhancement"}</span>}
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "9px", marginTop: "2px", letterSpacing: "1px" }}>PHASE {phase} — CLICK ANY ROW TO EXPAND</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: WHITE, fontWeight: 800, fontSize: "15px" }}>{fmt(bucket.total)}</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "10px" }}>{bucket.hrs} hrs</div>
        </div>
      </div>

      <div style={{ background: WHITE, borderRadius: "0 0 10px 10px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 130px 70px 130px 28px", padding: "7px 16px", background: "#F0F3F7", borderBottom: "1px solid #E0E5EE" }}>
          {["Feature / Sub-Task", "Hours", "Cost", "Phase", "Relative Effort", ""].map((h, i) => (
            <div key={i} style={{ fontSize: "8.5px", fontWeight: 800, color: "#6B7A90", letterSpacing: "1.5px", textTransform: "uppercase", textAlign: i === 0 ? "left" : i === 4 ? "left" : "center" }}>{h}</div>
          ))}
        </div>

        {bucket.tasks.map((t, i) => (
          <TaskRow
            key={i}
            task={t.task} hrs={t.hrs} cost={t.cost}
            what={t.what} supports={t.detail}
            gaps={t.gaps} pps={t.pps}
            color={color} phase={phase} maxHrs={maxHrs}
            rowBg={i % 2 === 0 ? WHITE : "#FAFBFC"}
            itemType={t.itemType}
          />
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 130px 70px 130px 28px", padding: "9px 16px", background: `${color}12`, borderTop: `2px solid ${color}30`, alignItems: "center" }}>
          <div style={{ fontSize: "10px", fontWeight: 800, color, letterSpacing: "0.5px" }}>BUCKET TOTAL</div>
          <div style={{ fontSize: "11px", fontWeight: 800, color, textAlign: "center" }}>{bucket.hrs} hrs</div>
          <div style={{ fontSize: "11px", fontWeight: 800, color, textAlign: "center" }}>{fmt(bucket.total)}</div>
          <div /><div /><div />
        </div>
      </div>

      <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
        <span style={{ fontSize: "9px", color: "#888", fontWeight: 700, letterSpacing: "1px" }}>GAPS:</span>
        {Object.entries(GAP_META).map(([k, m]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color }} />
            <span style={{ fontSize: "9px", color: "#555" }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EXPANDABLE BUCKET ROW (for overview tables) ─────────────────────────────

function BucketOverviewRow({ bucket, phase, maxHrs, rowBg }) {
  const [open, setOpen] = useState(false);
  const bColor = BUCKET_COLORS[bucket.name] || (phase === 1 ? ORANGE : phase === 2 ? NAVY : TEAL);
  const meta = BUCKET_META[bucket.name];
  const bType = BUCKET_TYPE[bucket.name];

  return (
    <>
      <div onClick={() => setOpen(o => !o)} style={{
        display: "grid", gridTemplateColumns: "1fr 80px 70px 100px 130px 70px 140px 28px",
        padding: "10px 16px",
        background: open ? `${bColor}08` : rowBg,
        borderBottom: "1px solid #EEF1F5",
        alignItems: "center", cursor: "pointer",
        transition: "background 0.15s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: bColor, flexShrink: 0 }} />
          <span style={{ fontSize: "11.5px", fontWeight: open ? 700 : 600, color: open ? bColor : "#2A3A50", transition: "color 0.15s" }}>{bucket.name}</span>
        </div>
        <div style={{ textAlign: "center" }}>{bType && <TypeBadge type={bType} />}</div>
        <div style={{ fontSize: "11px", color: "#888", textAlign: "center" }}>{bucket.tasks.length}</div>
        <div style={{ fontSize: "11px", color: "#4A5568", textAlign: "center" }}>{bucket.hrs} hrs</div>
        <div style={{ fontSize: "11px", fontWeight: 700, color: bColor, textAlign: "center" }}>{fmt(bucket.total)}</div>
        <div style={{ textAlign: "center" }}><PhaseBadge phase={phase} /></div>
        <div><EffortBar value={bucket.hrs} max={maxHrs} color={bColor} /></div>
        <div style={{ textAlign: "center", color: bColor, fontSize: "12px", fontWeight: 700, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
      </div>

      {open && meta && (
        <div style={{ background: `${bColor}06`, borderBottom: "1px solid #EEF1F5", padding: "16px 20px 16px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "9px", fontWeight: 800, color: "#888", letterSpacing: "2px", marginBottom: "8px" }}>WHAT THIS IS</div>
              <p style={{ fontSize: "11.5px", color: "#333", lineHeight: 1.65, margin: 0 }}>{meta.what}</p>
            </div>
            <div>
              <div style={{ fontSize: "9px", fontWeight: 800, color: "#888", letterSpacing: "2px", marginBottom: "8px" }}>HOW THIS SUPPORTS THE GOAL</div>
              <p style={{ fontSize: "11.5px", color: "#333", lineHeight: 1.65, margin: "0 0 12px 0" }}>{meta.supports}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "6px" }}>
                {meta.gaps.map(g => <GapTag key={g} gap={g} />)}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {meta.pps.map(p => <PPTag key={p} pp={p} />)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── PHASE OVERVIEW TABLE ─────────────────────────────────────────────────────

function PhaseOverview({ buckets, phase }) {
  const phaseColors = { 1: ORANGE, 2: NAVY, 3: TEAL };
  const phaseLabels = { 1: "Foundation & Experience — 2026", 2: "Automation & Integration — 2027", 3: "Platform Maturity — 2028+" };
  const color = phaseColors[phase];
  const grandTotal = buckets.reduce((s, b) => s + b.total, 0);
  const grandHrs = buckets.reduce((s, b) => s + b.hrs, 0);
  const grandTasks = buckets.reduce((s, b) => s + b.tasks.length, 0);
  const maxHrs = Math.max(...buckets.map(b => b.hrs));

  return (
    <div style={{ width: "100%", maxWidth: "900px" }}>
      <div style={{ background: color, padding: "14px 20px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: WHITE, fontWeight: 800, fontSize: "15px" }}>Phase {phase} — {phaseLabels[phase]}</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "9px", marginTop: "3px", letterSpacing: "1px" }}>
            {phase === 1 ? "Fixed scope — ADA Double A (WCAG 2.1 AA) included" : "Budget TBD — planning reference. Formally scoped after Phase 1 delivery."}
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "9px", marginTop: "2px", fontStyle: "italic" }}>Click any bucket row to see what it is and how it supports the goal</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: WHITE, fontWeight: 800, fontSize: "20px" }}>{fmt(grandTotal)}</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "10px" }}>{grandHrs} hrs across {buckets.length} buckets</div>
        </div>
      </div>

      <div style={{ background: WHITE, borderRadius: "0 0 10px 10px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px 100px 130px 70px 140px 28px", padding: "7px 16px", background: "#F0F3F7", borderBottom: "1px solid #E0E5EE" }}>
          {["Bucket", "Type", "Tasks", "Hours", "Cost", "Phase", "Scale", ""].map((h, i) => (
            <div key={i} style={{ fontSize: "8.5px", fontWeight: 800, color: "#6B7A90", letterSpacing: "1.5px", textTransform: "uppercase", textAlign: i === 0 ? "left" : i === 6 ? "left" : "center" }}>{h}</div>
          ))}
        </div>

        {buckets.map((b, i) => (
          <BucketOverviewRow key={b.name} bucket={b} phase={phase} maxHrs={maxHrs} rowBg={i % 2 === 0 ? WHITE : "#FAFBFC"} />
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px 100px 130px 70px 140px 28px", padding: "10px 16px", background: `${color}12`, borderTop: `2px solid ${color}30`, alignItems: "center" }}>
          <div style={{ fontSize: "10px", fontWeight: 800, color }}>PHASE {phase} TOTAL</div>
          <div />
          <div style={{ fontSize: "11px", fontWeight: 800, color, textAlign: "center" }}>{grandTasks}</div>
          <div style={{ fontSize: "11px", fontWeight: 800, color, textAlign: "center" }}>{grandHrs} hrs</div>
          <div style={{ fontSize: "11px", fontWeight: 800, color, textAlign: "center" }}>{fmt(grandTotal)}</div>
          <div /><div /><div />
        </div>
      </div>

      <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
        <span style={{ fontSize: "9px", color: "#888", fontWeight: 700, letterSpacing: "1px" }}>GAPS:</span>
        {Object.entries(GAP_META).map(([k, m]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color }} />
            <span style={{ fontSize: "9px", color: "#555" }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

const phaseColors = { 1: ORANGE, 2: NAVY, 3: TEAL };

function shortName(name) {
  return name
    .replace("Public Website Redesign", "Website")
    .replace("Member Portal Rebuild", "Portal")
    .replace("Identity, Auth & SSO", "Auth & SSO")
    .replace("Search & Resource Library", "Search")
    .replace("Secure Data & Forms", "Secure Data")
    .replace("CRM Optimization", "CRM")
    .replace("Student Experience — Phase 1+", "Student Exp")
    .replace("Operational Integration", "Ops Integration")
    .replace("AI Foundation", "AI Foundation")
    .replace("Student Experience Automation", "Student Auto")
    .replace("Prospect & Marketing Automation", "Prospect Auto")
    .replace("Intelligent Search & AI Expansion", "AI Search")
    .replace("Member Communication Automation", "Comms Auto")
    .replace("Operational Integration & Workflow", "Ops Workflow")
    .replace("Reporting & Analytics Access", "Reporting")
    .replace("Sports Census & Athletic Reporting", "Sports Census")
    .replace("Eligibility Management System", "EMS")
    .replace("Institutional Admin Console", "Admin Console")
    .replace("Personalized Member Experience", "Personalization")
    .replace("Thought Leadership & Content Platform", "Thought Leadership")
    .replace("Member Community & Network", "Community")
    .replace("AI Maturity & Prediction", "AI Maturity");
}

export default function FinalCostBreakdown() {
  const [active, setActive] = useState(DEFAULT_VIEW);

  const allBuckets = { 1: PHASE1_BUCKETS, 2: PHASE2_BUCKETS, 3: PHASE3_BUCKETS };

  const p1Total = PHASE1_BUCKETS.reduce((s, b) => s + b.total, 0);
  const p2Total = PHASE2_BUCKETS.reduce((s, b) => s + b.total, 0);
  const p3Total = PHASE3_BUCKETS.reduce((s, b) => s + b.total, 0);

  const summaries = [
    { phase: 1, cost: fmt(p1Total), note: "ADA included" },
    { phase: 2, cost: fmt(p2Total), note: "planning ref" },
    { phase: 3, cost: fmt(p3Total), note: "planning ref" },
  ];

  const currentBucket = [1, 2, 3].flatMap(p => allBuckets[p]).find(b => b.name === active);
  const currentPhase = currentBucket ? [1, 2, 3].find(p => allBuckets[p].includes(currentBucket)) : null;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: PALE, minHeight: "100vh", padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "3px", color: ORANGE, fontWeight: 700, marginBottom: "6px" }}>EIIA DIGITAL ECOSYSTEM — INVESTMENT SUMMARY</div>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: NAVY, margin: 0 }}>What Drives the Cost — Hours Behind Every Feature</h1>
        <p style={{ fontSize: "11px", color: "#888", marginTop: "6px", maxWidth: "600px", margin: "6px auto 0" }}>
          Every hour is design and development combined at $250/hr. Click any row to see what the work is, how it closes a gap, and which pain points it addresses.
        </p>
      </div>

      {/* Phase summary cards */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        {summaries.map(s => (
          <div key={s.phase} onClick={() => setActive(`p${s.phase}-overview`)} style={{
            padding: "10px 20px", borderRadius: "10px", cursor: "pointer",
            background: active.startsWith(`p${s.phase}`) ? phaseColors[s.phase] : WHITE,
            border: `2px solid ${phaseColors[s.phase]}`,
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: active.startsWith(`p${s.phase}`) ? "rgba(255,255,255,0.7)" : "#888", letterSpacing: "1px" }}>Phase {s.phase}</div>
            <div style={{ fontSize: "17px", fontWeight: 800, color: active.startsWith(`p${s.phase}`) ? WHITE : phaseColors[s.phase] }}>{s.cost}</div>
            <div style={{ fontSize: "9px", color: active.startsWith(`p${s.phase}`) ? "rgba(255,255,255,0.6)" : "#aaa", fontStyle: "italic" }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* Tab rows */}
      <div style={{ width: "100%", maxWidth: "900px", marginBottom: "20px" }}>
        {[1, 2, 3].map(phase => (
          <div key={phase} style={{ marginBottom: "6px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", background: `${phaseColors[phase]}10`, borderRadius: "10px", padding: "4px" }}>
              <button onClick={() => setActive(`p${phase}-overview`)} style={{
                padding: "5px 14px", borderRadius: "7px", border: "none", cursor: "pointer",
                fontSize: "10px", fontWeight: 800,
                background: active === `p${phase}-overview` ? phaseColors[phase] : "transparent",
                color: active === `p${phase}-overview` ? WHITE : phaseColors[phase],
                transition: "all 0.2s",
              }}>P{phase} Overview</button>
              {phase === 1 && (
                <button onClick={() => setActive("p1-checklist")} style={{
                  padding: "5px 14px", borderRadius: "7px", cursor: "pointer",
                  fontSize: "10px", fontWeight: 800,
                  border: `1.5px solid ${phaseColors[1]}`,
                  background: active === "p1-checklist" ? phaseColors[1] : WHITE,
                  color: active === "p1-checklist" ? WHITE : phaseColors[1],
                  transition: "all 0.2s",
                }}>P1 Progress</button>
              )}
              {allBuckets[phase].map(b => (
                <button key={b.name} onClick={() => setActive(b.name)} style={{
                  padding: "5px 12px", borderRadius: "7px", border: "none", cursor: "pointer",
                  fontSize: "9.5px", fontWeight: 700,
                  background: active === b.name ? (BUCKET_COLORS[b.name] || phaseColors[phase]) : "transparent",
                  color: active === b.name ? WHITE : "#555",
                  transition: "all 0.2s", whiteSpace: "nowrap",
                }}>{shortName(b.name)}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      {active === "p1-overview" && <PhaseOverview buckets={PHASE1_BUCKETS} phase={1} />}
      {active === "p1-checklist" && <Checklist bucketColors={BUCKET_COLORS} />}
      {active === "p2-overview" && <PhaseOverview buckets={PHASE2_BUCKETS} phase={2} />}
      {active === "p3-overview" && <PhaseOverview buckets={PHASE3_BUCKETS} phase={3} />}
      {currentBucket && <BucketTable bucket={currentBucket} phase={currentPhase} />}

      {/* Footer notes */}
      <div style={{ marginTop: "16px", maxWidth: "900px", width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ padding: "10px 16px", background: "rgba(0,0,0,0.04)", borderRadius: "8px", borderLeft: `3px solid ${ORANGE}` }}>
          <p style={{ margin: 0, fontSize: "10px", color: "#666", lineHeight: 1.6 }}>
            <strong style={{ color: NAVY }}>Note:</strong> Phase 1 is fixed scope at {fmt(p1Total)} with ADA Double A (WCAG 2.1 AA) included. Phase 2 ({fmt(p2Total)}) and Phase 3 ({fmt(p3Total)}) are planning references at $250/hr, formally scoped after Phase 1 delivery. All hours reflect design and development combined.
          </p>
        </div>

        <div style={{ padding: "10px 16px", background: "rgba(0,0,0,0.04)", borderRadius: "8px", borderLeft: `3px solid ${ORANGE}` }}>
          <p style={{ margin: 0, fontSize: "10px", color: "#666", lineHeight: 1.6 }}>
            <strong style={{ color: NAVY }}>Translation:</strong> Multi-language support is included in Phase 1 at no additional charge. Implementation assumes a Google Translate integration or a CMS plugin that allows manual content language control with proper sitemaps for each language version.
          </p>
        </div>

        <div style={{ padding: "10px 16px", background: "rgba(0,0,0,0.04)", borderRadius: "8px", borderLeft: `3px solid ${ORANGE}` }}>
          <p style={{ margin: 0, fontSize: "10px", color: "#666", lineHeight: 1.6 }}>
            <strong style={{ color: NAVY }}>COI Requests:</strong> Currently handled two ways — non-portal users request manually via Gravity Forms; portal users request through the portal. Recommendation: explore embedding Origami's "Request a Certificate of Insurance" form directly into the EIIA site, allowing all users (including non-portal users like athletic coaches) to submit COI requests directly into the Origami workflow. Feasibility to be confirmed during architecture sessions.
          </p>
        </div>

        <div style={{ padding: "10px 16px", background: "rgba(0,0,0,0.04)", borderRadius: "8px", borderLeft: `3px solid ${ORANGE}` }}>
          <p style={{ margin: 0, fontSize: "10px", color: "#666", lineHeight: 1.6 }}>
            <strong style={{ color: NAVY }}>New Member Walkthrough:</strong> Researching third-party onboarding walkthrough software (e.g., Appcues, UserGuiding, Intro.js) that can be placed via script tag at no cost or low cost. No custom build unless EIIA requires functionality beyond what these tools provide.
          </p>
        </div>
      </div>
    </div>
  );
}
