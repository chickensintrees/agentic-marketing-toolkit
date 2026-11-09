# INTENT.md — Bill Moore's intent for the lecture and the toolkit

## 1. Purpose and precedence

This file records Bill Moore's intent, in his own words and in the decisions he
has made. It governs content and design decisions for:

- the lecture: the slide deck and everything in `docs/workshop/`;
- the product: the Agentic Marketing Toolkit, including this repository's
  design, copy and student-facing documents.

Precedence:

1. **INTENT.md** — what Bill wants and why.
2. **SPEC.md** (suite) and `src/tools/<tool-id>/SPEC.md` (each tool) — product
   requirements that implement this intent.
3. Code, the deck, and the documents — implementations of the above.

If a spec, the deck, or a document conflicts with this file, this file wins and
the other is updated. Intent changes only when Bill states it. Agents may
propose additions (section 8) but do not edit sections 2–7 on their own
authority. Items marked *(inferred)* are interpretations, not Bill's words.

---

## 2. Bill's words (verbatim)

### 2.1 Planning conversation (ChatGPT, evening of 8 November 2026)

**M1.** "I want to think through, I've got tomorrow morning I'm doing a guest
lecture for an hour at WVU for a room full of marketing MBA students taking a
marketing class. And I'm supposed to present on AI and marketing. My, I'm trying
to figure out what I'm going to talk to them about. I think I'm going to show
them some demos of the work that I do. And then I want, what I want them to
start thinking about is how they can start building their own software and
building their own tools using things like Claude Code and Codex and
specifically I want them to learn how to use GitHub. So I'm going to create a
repo and it's going to be an open repo that they can use to learn how to build
their own tools with Claude Code or Codex or Cursor or Lovable or Replit,
whatever they want to use. And I want to teach them the basics of GitHub, how to
connect GitHub to their coding agent and how to collaborate on a project through
GitHub. How to push, pull, merge, commit, all these things in open a PR. And
basically your homework class is a pull request. I hope to see at least some of
you send a pull request to this repo. I'm not sure what the repo is going to be
exactly. Maybe we figure that out in class. Let's think this through"

**M2.** "Let's turn this into a slide deck that I can present for the class. I
think the idea here is that we'd like to build, we're gonna build a project
together. This is voluntary and optional unless, unless the teacher decides that
he wants the students to do it. But I'm going to make myself available to any
student in the class who wants to contribute. So they're going to need a GitHub
account. They're going to need some coding software. They're going to need, and
by coding software I mean agentic, so Cursor, Replit, Lovable, Claude Code or
Codex. And they're going to need some initial instructions and prompts to get
them started. I think what I should be able to give them is a GitHub repo link
that they can just paste into their coding app. And it will have an agents.md
file which will instruct that coding app to fork the repo and it will include
all of my AI coding rules and spec-driven development frameworks. I don't know
if you can access my GitHub from here. Yeah, we'll get there. Let's build the
deck"

**M3.** "We should use one of those survey, like instant survey tools so that
the students can use their phones or laptops to add ideas to like a word cloud.
Then we can talk about. So we should insert, I think Slido. We should insert
several Slido moments"

**M4.** "I think we also need to show an example. So I know they're studying
Porters five forces in marketing. Maybe we can give them a prompt that will
generate an application that will help them understand Porter's Five Forces and
all of its dimensions. So we can build that app and we can show that off in
class. And we can share the prompt. It's like, give your coding agent this
prompt, which will include a link to the repo in the agents.md file. And it will
build this, it'll build this for you. And you can change it. You can add to it.
And you can submit pull requests so that your changes become part of the the
published app. I think that's the, and you'll gain access to our, so maybe
actually what we should talk about here is harness engineering. So one of the
repos we'll share is a harness. And a harness, an agentic harness is something
that we can build to get our agents to work the way we want them to work and
give them the tooling they need to do what we're trying to do. And so we can do
a bit of a deep dive into harnesses starting with where the word came from. A
harness is something you can use to connect a source of power to a human. So a
horse connected to a cart being steered by a human. The harness allows the human
to control the source of power. And in this case it's an agent. And we're
building this harness so that we can get this agent to do, to behave how we want
it to behave. So we have harnesses for coding agents that allow them to do all
kinds of things. And we have, also have rules, we have skills, we have tooling.
We have all this stuff that we store in repos. And so harness is is going to be
part of the talk"

**M5.** "We need to figure out how to move this over to Codex so that we can
actually build these things"

### 2.2 Directions to the orchestrator (Claude Code session, 9 November 2026, times UTC, approximate where marked ~)

| # | Time | Words |
|---|---|---|
| D1 | 01:58 | Shared the ChatGPT conversation link. |
| D2 | ~02:12 | Created and sent `https://github.com/chickensintrees/five-forces-explorer`. |
| D3 | ~02:16 | "Ok. We are using subagents / subsessions to do work chunks. You are orchestrating." |
| D4 | ~02:18 | "I need an agetn to rethink the slide deck. I feel like it's not right for what we're doing now. Start from first principles." |
| D5 | ~02:20 | "And I don't like the title, it's not right" |
| D6 | ~02:20 | "I'm going to teach them how to collaborate on a large project via agents. They're going to learn about how products are built in the new agentic world. How we can work togehter on a repo through agent comms and PRs." |
| D7 | ~02:21 | "Ultimately, we are building a product together as a class. And I am giving them the tools to continue to build out a suite of tooling for their MBA jounreys and beyond with my guidance and support." |
| D8 | ~02:30 | Sent `https://github.com/chickensintrees/agentic-marketing-toolkit` (repository renamed). |
| D9 | ~02:33 | "We're going to show the students how to connect their coding agents to the github api. This is the key. Then their agents can manage git for them." |
| D10 | ~02:43 | "TLDR. Show me everything." |
| D11 | ~03:00 | "The copy throughout is too cutesy. Like it was written by a copywriter for a magaizne. We are making a slide deck to be presented in a university." |
| D12 | ~03:05 | "The order of these slides doesn't make a lot of sense." |
| D13 | ~03:06 | "Shouldn't I introduce myself first? Why are we starting with the github link?" |
| D14 | ~03:12 | "We need to add a slide where I'm not just going right into the Porter's Five Forces thing. I'm going to demo some stuff from BCG so I can show like the kind of thing that I work on. And then we'll show a demo of Porter's Five Forces application. Is it built? Why is it still a placeholder for the screenshot? Can you take a screenshot of what we have so far? And can we see that app? Is someone working on that? please." |
| D15 | ~03:15 | "This website that you're showing me is terrible. It's a wall of text. It should be visual. We're going to need to think through and generate images. And visuals through various means. And much simpler. Not a wall of text. And this design system, this aesthetic, it looks like AI slop. Software as a service. Get rich quick. We need to think through this whole thing here." |
| D16 | ~03:17 | "We need a slide on github basics... We are missing things from the original chatgpt conversation." |
| D17 | ~03:18 | "We need to pull and codify all of my intent from that chatgpt conversation into a durable artifact that drives our design and content decisions." |

### 2.3 Answers to the orchestrator's questions

| Time | Question | Bill's answer (verbatim) |
|---|---|---|
| ~02:22 | Make the class repo a multi-tool suite tonight? | "Suite now (Recommended)" |
| ~02:22 | Repository name? | "agentic-marketing-toolkit" |
| ~02:45 | Lecture title? | "How Products Get Built Now" (later edited by Bill in the deck to "How products get built") |
| ~02:45 | Agent for the live demo? | "Claude Code" |
| ~02:45 | Create labels and starter issues in the repo? | "Yes, create them (Recommended)" |
| ~02:53 | How should poll 1 end? | "…what would you have them build? And Stop referencing "MBA" in the deck." |
| ~02:53 | Open with a live tour of the toolkit? | "Just add a simple placeholder I will pull up the live site. Stop adding all these cutesy superflous text throughout. Every word on screen must earn it's place. Leave the editorializing t o the speaker" |

### 2.4 Comments on the deck artifact

| Time | Slide (at the time) | Comment (verbatim) |
|---|---|---|
| 02:49 | Cover, "How products get built" | "It's more about how we use harnesses to control agents to build tools and how we collobarote on building tools, products, even businesses in GitHub." |
| 02:53 | "Last night, people and agents built this together." | "You're getting too cutesy. Why are you referencing "last night"?" |
| 02:59 | About (bio slide) | "Too much text. Simplify. I will take them to my billmoore.ai website. Just a simple "About Me" slide" |
| 03:09 | "What a harness does" | "This doesn't make sense" |
| 03:09 | "What a harness does" | "Why are Cart and Driver "work"?" |
| 03:16 | "Components of a harness" | "Why is Checks a different color here??" |

Bill also edited the deck directly in the page: he changed the title to "How
products get built", removed the slide "This didn't exist yesterday", rewrote
the About slide to "About me / Bill Moore / billmoore.ai", and wrote the poll 1
question.

---

## 3. The lecture

**Setting.** Guest lecture, West Virginia University, Monday 9 November 2026,
morning, one hour (M1). The audience is a room of marketing MBA students in a
marketing class (M1), with the course instructor present (M2: "unless the
teacher decides"). Students are studying Porter's Five Forces (M4). The deck
does not say "MBA" (2.3).

**Register.** A university lecture (D11): plain, factual and academic. The slides
carry only what earns its place, and the speaker does the editorializing (2.3).

**The two ideas** (2.4, cover comment):

1. Harnesses: how we use harnesses to control agents so they build tools.
2. GitHub: how we collaborate on building tools, products, even businesses
   in GitHub.

**The key unlock** (D9): connect the coding agent to the GitHub API so the agent
manages git for the student.

**Required segments** (each from Bill's words):

| Segment | Source |
|---|---|
| Introduce himself first; simple "About me" slide, then billmoore.ai | D13, 2.4 |
| Demos of his own work, including BCG work, before the Five Forces app | M1, D14 |
| How students can build their own software and tools with agentic coding tools | M1 |
| GitHub basics: push, pull, merge, commit, open a PR; collaborating through GitHub | M1, D16 |
| How to connect GitHub to the coding agent, so the agent manages git | M1, D9 |
| Collaborating on a large project via agents: agent comms and PRs | D6 |
| Harness deep dive, starting from where the word came from; source of power, harness, cart, human steering; rules, skills, tooling stored in repos | M4 |
| One of the shared repos is the harness | M4 |
| The Porter's Five Forces app as the example: built, shown in class, with the prompt shared | M4 |
| Several live audience moments (Slido), including a word cloud | M3 |
| The invitation: homework is a pull request; voluntary unless the instructor assigns it; Bill available to any student who wants to contribute | M1, M2 |
| What students need: a GitHub account, an agentic coding tool (Cursor, Replit, Lovable, Claude Code or Codex), initial instructions and prompts | M2 |
| A repo link students paste into their coding app; the repo's AGENTS.md instructs the agent to fork and includes Bill's AI coding rules and spec-driven framework | M2 |
| Show the live site via a simple placeholder slide; Bill switches to the browser | 2.3 |

**Live demonstration agent:** Claude Code (2.3).

---

## 4. The product

- **What it is.** A product the class builds together, as a suite of tools that
  students keep building "for their MBA jounreys and beyond", with Bill's
  guidance and support (D7). Name: **Agentic Marketing Toolkit** (2.3).
  Repository: https://github.com/chickensintrees/agentic-marketing-toolkit.
- **Tool #1:** a Porter's Five Forces application "that will help them
  understand Porter's Five Forces and all of its dimensions" (M4). Five Forces
  Explorer was built on 9 November 2026.
- **How people contribute.** Students change it, add to it, and submit pull
  requests so their changes become part of the published app (M4). The work
  happens through forks and PRs (M1, M2), and agents do the git once connected
  to GitHub (D9).
- **Two kinds of repository** (M4):
  - the harness, https://github.com/chickensintrees/ai-coding-rules (Bill's AI
    coding rules and spec-driven development framework);
  - the app repository above.
- **The app repository's AGENTS.md** instructs the coding app to fork the repo
  and includes Bill's AI coding rules and spec-driven framework (M2).
- **Tools.** Students may use any agentic coding tool: Cursor, Replit, Lovable,
  Claude Code, Codex (M1, M2).
- **The design** must follow section 5.

---

## 5. Design and content principles

Each principle is traceable to Bill's words.

| # | Principle | Applies to | Source |
|---|---|---|---|
| P1 | Visual first: not a wall of text. | Product, deck | D15 |
| P2 | Use images and visuals, generated "through various means". | Product, deck | D15 |
| P3 | Much simpler. | Product, deck | D15 |
| P4 | No SaaS / "AI slop" / "get rich quick" aesthetic. | Product | D15 |
| P5 | Every word on screen must earn its place; leave the editorializing to the speaker. | Deck (and, *inferred*, product) | 2.3 |
| P6 | University register, not magazine copywriting; not cutesy. | Deck, docs | D11, 2.3, 2.4 |
| P7 | No slogans or taglines. *(inferred from P5–P6 and the removal of "My agent does the git. I make the calls.")* | Deck | D11 |
| P8 | Don't say "MBA" in the deck. | Deck | 2.3 |
| P9 | No "last night" / "overnight" / "yesterday" framing. | Deck | 2.4 |
| P10 | Visual consistency: no unexplained differences in color or emphasis. | Deck, product | 2.4 (Checks) |
| P11 | Logical order: introduce yourself first; don't open on a link. | Deck | D12, D13 |
| P12 | Analogies must be accurate: in the harness analogy the driver steers; the driver is not the work. | Deck | 2.4 |

---

## 6. Decisions log

| Time (UTC, 9 Nov) | Decision | Made by |
|---|---|---|
| 01:58 | Build the things planned in the ChatGPT conversation in Claude Code (M5 asked about Codex). | Bill (by sharing the link); orchestrator proceeded |
| ~02:12 | Bill creates the GitHub repository. | Bill |
| ~02:16 | Work is split into chunks done by subagents and sub-sessions; the orchestrator coordinates. | Bill |
| ~02:18 | Rethink the deck from first principles; the old deck and title are rejected. | Bill |
| ~02:22 | The product is a suite now; Five Forces is tool #1. | Bill |
| ~02:22 | Repository name: `agentic-marketing-toolkit`. | Bill |
| ~02:33 | Connecting the agent to the GitHub API is the key moment of the talk. | Bill |
| ~02:45 | Title "How Products Get Built Now", later "How products get built" (Bill's edit). | Bill |
| ~02:45 | Live demo agent: Claude Code. | Bill |
| ~02:45 | Create repository labels and starter issues. | Bill |
| 02:49 | The talk's two ideas: harnesses control agents; GitHub is where tools, products and businesses are built together. | Bill |
| ~02:53 | Poll 1 wording; no "MBA" in the deck; live-site placeholder slide; minimal on-screen copy. | Bill |
| 02:59 | "About me" slide reduced to name and billmoore.ai. | Bill |
| ~03:00 | Plain university register across the deck. | Bill |
| ~03:06 | Introduce himself first; the live site moves next to the toolkit. | Bill |
| 03:09 | Harness analogy corrected (power, harness, load, control; the driver is the person). | Bill (comment); orchestrator implemented |
| ~03:12 | BCG demo slide before the Five Forces part. | Bill |
| ~03:15 | Redesign the app: visual, simpler, not SaaS. Three design directions commissioned for Bill to choose from. | Bill; orchestrator commissioned |
| ~03:17 | Add a GitHub basics slide; restore missing material from the ChatGPT conversation. | Bill |
| ~03:18 | Create this file as the source of truth for intent. | Bill |
| ~02:03 | The product spec is written before code (SPEC.md), following Bill's Rule 5 (spec first). | Orchestrator |
| ~02:33 | Starter prompt v3: the agent connects to GitHub with a browser sign-in and asks before anything public. | Orchestrator, following D9 |
| ~03:05 | "My agent does the git. I make the calls." removed from the deck as a slogan. | Orchestrator, following D11 |

---

## 7. Content inventory from the ChatGPT conversation

Status is against deck version 52 (18 slides: cover, about, join, harness,
parts, key, bcg, toolkit, live, overnight, vote, prompt, porter, checks,
contribute, needs, close, questions) and the repository branch
`claude/hopeful-knuth-mp3jzi`. "Bill's" in the Source column means Bill asked for
it; "ChatGPT" means ChatGPT proposed it and Bill did not explicitly endorse or
reject it.

| # | Item | Source | Status | Action |
|---|---|---|---|---|
| 1 | Demos of Bill's work (GENE, interactive work, workflow tools) | Bill's (M1); ChatGPT slide "Things I've built with AI" | Present: "About me" (billmoore.ai), "Work at BCG" | None |
| 2 | Provocation: "Marketing students should graduate knowing how to build software, not just how to use software" / "What if the tool you needed didn't exist yet?" (old model / new model / your role) | ChatGPT | Partial: poll 1 asks what tool they would have built | Ask Bill (section 8) |
| 3 | Title "Stop Renting Your Tools. Start Building Them." | ChatGPT | Dropped by Bill (D5) | None |
| 4 | "You don't have to become a software engineer. You do have to learn how to direct, test, and improve software." (strategy, specification, judgment) | ChatGPT; consistent with M1 | Missing | Ask Bill |
| 5 | "Choose an AI coding environment" (editor + agent; browser-based; shared foundation of GitHub, Git and project instructions) | Bill's tools list (M1, M2); ChatGPT slide | Partial: "Tools and plans" table lists the tools and plans | None, unless Bill wants the grouping |
| 6 | "An idea is not a specification": Define → Build → Verify → Share | ChatGPT | Partial: "Components of a harness" (Spec); "From change to merge" pipeline | Ask Bill |
| 7 | "GitHub is where we build together": repository, branch/fork, pull request | Bill's (M1, D16) | Missing as a slide; `docs/github-basics.md` exists in the repo | Add a GitHub basics slide (D16), in progress |
| 8 | Vocabulary and verbs: repository, clone, branch, commit, push, pull, pull request, fork, review, merge | Bill's (M1: "push, pull, merge, commit… open a PR") | Missing in the deck; present in `docs/github-basics.md` | Covered by the GitHub basics slide |
| 9 | Collaboration loop: fork → change → pull request → review and merge | Bill's (M1, M2); ChatGPT slide | Partial: "From change to merge" (no fork step); "How to contribute" | Show the fork step on the GitHub basics slide |
| 10 | Connect GitHub to the coding agent | Bill's (M1, D9) | Present: "Connecting an agent to GitHub"; `docs/students/connect-github.md` | None |
| 11 | Class project as a marketing toolbox / shared application | ChatGPT; superseded by Bill's suite decision (D7) | Present: "The Agentic Marketing Toolkit" | None |
| 12 | "Three things to get started": GitHub account, coding agent, the repo | Bill's (M2) | Present: "How to contribute" steps 1–3 | None |
| 13 | AGENTS.md as the project playbook; instructs the agent to fork; includes Bill's rules and spec-driven framework | Bill's (M2) | Present: "Components of a harness" (Rules: AGENTS.md); repo AGENTS.md has a condensed version of the 12 rules, spec-first workflow, fork protocol, and link to ai-coding-rules | None |
| 14 | First prompt / starter prompt students paste into their agent | Bill's (M2, M4) | Present: "The prompt" (demo prompt); handout and `docs/students/starter-prompt.md` | None |
| 15 | A prompt that generates the Five Forces app ("give your coding agent this prompt… it'll build this for you") | Bill's (M4) | Partial: the starter prompt onboards a contributor to the existing app; no prompt regenerates the app | Ask Bill |
| 16 | The invitation: "Your contribution: one pull request"; voluntary unless assigned; Bill helps | Bill's (M1, M2) | Present: "How to contribute" | None |
| 17 | "Quality matters": privacy, accuracy, security, accessibility; working code is only the beginning; human ownership; small changes | ChatGPT | Missing in the deck (questions notes mention code quality) | Ask Bill |
| 18 | Live segment: one idea, one change, one PR | ChatGPT; consistent with M4 | Present: Poll 2 → The prompt → Poll 3 → From change to merge | None |
| 19 | Closing line "The next tool you need might be the one you build." | ChatGPT | Dropped (slogan register, P6–P7); replaced by "Summary" | None |
| 20 | Slido: "What slows down your marketing work?" (word cloud) | ChatGPT (under M3) | Missing (Bill wrote a different poll 1) | Ask Bill (free plan: 3 polls + 1 quiz per event) |
| 21 | Slido: "What tool do you wish existed?" (word cloud) | ChatGPT (under M3) | Present, reworded by Bill: "If you could hire a team of software developers… what would you have them build?" | None |
| 22 | Slido: "Which idea should we build first?" (multiple choice) | ChatGPT (under M3) | Partial: Poll 2 votes on which industry to add | None |
| 23 | Slido: "What would help you contribute?" (multiple choice) | ChatGPT (under M3) | Missing | Ask Bill |
| 24 | Slido: "What should our app teach next?" (word cloud / open text) | ChatGPT (under M3) | Missing (Poll 3 rates a force instead) | Ask Bill |
| 25 | "Build a Five Forces explorer" / "Five forces. Five questions." overview | Bill's (M4); ChatGPT slides | Partial: the live site and Poll 3 show one force; no overview of all five | Ask Bill |
| 26 | Harness: where the word came from; horse → harness → cart, steered by a human | Bill's (M4) | Present: "What a harness does" (etymology, comparison table) | None |
| 27 | Harness anatomy: rules, skills, **tooling** (Bill); ChatGPT also listed specs and checks | Bill's (M4) | Partial: "Components of a harness" shows Spec, Rules, Skills, Checks; **tooling is missing** | Add Tools / tooling (M4) |
| 28 | Two repositories: one harness, one application | Bill's (M4: "one of the repos we'll share is a harness") | Partial: the harness repo URL appears only as a footer on "Components of a harness" | Ask Bill whether to show both repos explicitly |
| 29 | Copy-this-prompt slide: "Build it. Change it. Contribute." | Bill's (M4) | Present: "How to contribute" and the handout | None |
| 30 | Show what happens when the agent makes a bad decision | ChatGPT | Partial: "From change to merge" notes say a failing check is the harness working | None |
| 31 | Codex kickoff application requirements (React/TS/Vite; five dimensions; explanations and examples; industry selection and editable profile; ratings and visual summary; guided exercise; responsive and accessible; no paid APIs; illustrative vs verified) | ChatGPT, under M5 | Present in the app (SPEC 0.2.0, 193 tests); visual design rejected by Bill (D15); redesign in progress | Redesign per section 5 |
| 32 | Codex kickoff harness requirements (AGENTS.md; docs/specs; docs/workflows; skills; lint, type checks, build, tests; contribution guide; PR template; beginner GitHub instructions; small-change rules; never assume GitHub auth) | ChatGPT, under M5 | Present in the repository | None |
| 33 | Student onboarding instructions with a copyable prompt; what needs human approval | ChatGPT, under M5; Bill's (M2) | Present: `docs/students/START-HERE.md`, `connect-github.md`, `starter-prompt.md` | None |
| 34 | Repo structure: README, CONTRIBUTING, AGENTS.md, issue templates, PR template, "good first issue" issues | ChatGPT | Present: files exist; issues approved by Bill (2.3), to be created | Create issues after review |
| 35 | "Move this over to Codex" | Bill's (M5) | Partial: built in Claude Code; Codex supported via AGENTS.md and ai-coding-rules PR #2; demo agent is Claude Code (2.3) | None |

**Missing:** 8 items (4, 7, 8, 17, 20, 23, 24, and tooling in 27). Items 7
and 8 are covered by the GitHub basics slide now being added.

---

## 8. Open questions for Bill

1. **Slides to restore.** Which of these ChatGPT-era items should come back:
   - "You don't have to become a software engineer" (item 4);
   - "An idea is not a specification" (item 6);
   - "Quality matters: privacy, accuracy, security, accessibility" (item 17);
   - a "Five forces, five questions" overview (item 25);
   - the opening provocation (item 2)?
2. **Slido.** The free plan allows 3 polls plus 1 quiz per event. The current
   three are: what you would have developers build; which industry to add; rate
   one force. Keep these, or swap one for "What slows down your marketing work?",
   "What would help you contribute?" or "What should our app teach next?"
   (items 20, 23, 24)? A second Slido event is also possible.
3. **Harness anatomy.** Add tooling as its own component next to spec, rules,
   skills and checks (item 27, M4)?
4. **Two repositories.** Show the harness repo and the app repo explicitly on
   a slide (item 28)?
5. **"Give your coding agent this prompt… it'll build this for you."** Should
   there be a prompt that regenerates the app from scratch, or is the
   contributor starter prompt enough (item 15)?
6. **Assignment.** Whether contributing is assigned is the instructor's
   decision (M2). Is it settled?
7. **App design direction.** Three mockups are being prepared (ink-and-paper
   textbook plate, stark monochrome minimal, classroom whiteboard sketch). Which
   direction?
