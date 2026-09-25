Here is the vocabulary we have converged on so far.
## Artifact

A durable source or output retained by the system.

### Source artifact

Uncurated material retained as evidence.

Examples:

* meeting transcript;
* recording;
* supplied document;
* PR-FAQ used to define an anchor.

### Curated artifact

Human-confirmed structured output derived from source material.

Examples:

* meeting record;
* anchor record;
* topic record.

### Knowledge record

We initially used this term, but replaced it with the broader **topic record**, because not every record represents established knowledge.

## Meeting

A real-world meeting event from which information is extracted.

A meeting has metadata such as title, date, participants, category, purpose and source transcript.

### Meeting category

The documented classification of a meeting:

* `daily` — recurring daily coordination;
* `weekly` — recurring weekly coordination or alignment;
* `workshop` — collaborative exploration or creation;
* `ad-hoc` — a non-recurring meeting for a specific need;
* `other` — does not fit the configured categories.

### Meeting record

The curated account of one meeting and its contribution to the wider knowledge structure.

It contains:

* meeting metadata;
* topics discussed;
* changes or records created;
* provenance;
* agent interpretations.

### Agenda item

A topic or matter planned for discussion in a particular meeting.

An agenda item is meeting-specific and may refer to an existing topic or discussion.

## Anchor

A stable, named thing to which topics are attached.

An anchor can represent an initiative, product, system, feature, epic, component, organization, person, external service or another meaningful object.

Examples:

```text
Anchor: APD
Classification: initiative
State: exploring
```

```text
Anchor: Authentication
Classification: feature
```

The anchor’s identity remains stable while its classification may change over time. `Classification` is preferred over “anchor type.”

An anchor should only be created when it has durable relevance. The agent may suggest anchors, but the user confirms them before they become canonical.

## Topic

A persistent area of knowledge or inquiry concerning one or more anchors.

A topic can span many meetings and can remain active even when no meeting is currently discussing it.

Examples:

* APD requirements;
* authentication approach;
* legacy-code modernization;
* onboarding workflow.

A topic is not the same as an agenda item:

* an agenda item is planned for one meeting;
* a topic persists across meetings;
* a topic may arise without having been planned.

## Topic record

An individually identifiable record associated with a topic.

Topic-record types are grouped as follows.

### Commitments

**Decision**
An explicit conclusion that governs understanding or action.

**Action**
Work that has been assigned to an identifiable owner.

An action cannot become canonical without an owner.

### Considerations

**Assumption**
A proposition the participants are provisionally treating as true.

**Concern**
A potentially adverse consequence, limitation or risk that remains relevant.

### Open matters

**Question**
Information that is missing and could be answered.

**Discussion**
A continuing matter that requires deliberation or agreement. A discussion belongs to a topic and may span multiple meetings. Its record contains only its current status, current understanding, open points and linked topic records.

**Ambiguity**
Information that supports multiple plausible interpretations and requires clarification.

The distinctions are:

```text
Question  = We do not know something.
Discussion = We have not reached agreement.
Ambiguity = Existing information can be interpreted in multiple ways.
```

A discussion may be resolved by a decision. An ambiguity may be clarified by a decision, definition or explicit clarification. A question may be answered or invalidated.

## Agent interpretation

A provisional interpretation introduced by the agent while transforming source material into curated artifacts.

It does not represent a belief, decision or assumption held by the meeting participants.

Examples:

* interpreting “Cascade OS” as “QasqadeOS”;
* treating two names as aliases;
* matching a transcript reference to an existing anchor;
* classifying a statement as a concern rather than a decision.

Agent interpretations are disclosed, correctable and normally non-blocking when they are low-risk and reversible. They become questions for the user when they could materially affect identity, ownership, topic grouping or decision status.

## Provenance

The evidence linking a curated artifact or record to its source.

Provenance may point to:

* a meeting;
* a transcript location;
* a supplied document;
* explicit user input.

## Core relationship

The whole model can be summarized as:

> **Meetings discuss topics concerning anchors and create or update topic records.**

Or, more fully:

```text
Source artifact
    ↓
Meeting
    ↓
Topic
    ↓
Topic records
    ├── decisions
    ├── actions
    ├── assumptions
    ├── concerns
    ├── questions
    ├── discussions
    └── ambiguities
```

One implementation note: this vocabulary represents the conceptual model we have developed, but the current POC files still use some earlier terms internally, especially `entity` and meeting-bound `discussion`. If you approve this vocabulary, the schemas, templates and `AGENTS.md` should be updated to use `anchor` and the current-state discussion model consistently.

