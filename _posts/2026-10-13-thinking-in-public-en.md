---
layout: post
title: "Learning to Think in Public: Notes on Writing, Tools, and Attention"
date: 2026-10-13 20:00:00 +0800
categories: [写作]
lang: en
sample: true
---

A personal blog can be more than a place to publish finished ideas. It can be a workshop for questions, a record of changing assumptions, and a quiet way to pay attention. This essay explores how to build that kind of writing practice.

<!-- more -->

*This is a long sample essay for comparing English and Chinese typography. Read the [Chinese version]({{ '/thinking-in-public-zh/' | relative_url }}) with the same structure and examples.*

## 1. A page is a place to begin

Imagine opening a blank document after a day of work. You have answered messages, fixed a small problem, read half an article, and made a note that you no longer understand. Nothing seems large enough to become a proper essay. Yet the day contains several things worth keeping: a surprising failure, a useful explanation, a question you asked twice, or a sentence that changed the way you saw a familiar task.

The difficulty is often the expectation that writing must begin with a complete argument. Under that expectation, the blank page becomes a test. You are supposed to demonstrate that you already know what matters, how the parts connect, and what a reader should conclude. A more useful starting point is smaller: describe one thing clearly enough that your future self can recognize it.

A blog can hold that description without pretending it is the final word. It gives a thought a location, a date, and enough context to remain legible after the feeling that produced it has faded. The value of the page comes from what it preserves, and from the next question it makes possible.

### Start with a scene

Instead of writing “I have been thinking about productivity,” write about the moment you opened six tabs to answer one question and forgot the question. A scene gives the reader something concrete to inspect. It also gives the writer a boundary: this is the event I am trying to understand, and these are the details I actually remember.

## 2. Questions are a useful unit of work

Topics are spacious. “Learning,” “software,” and “attention” can hold almost anything, which makes them difficult places to start. Questions create a more manageable shape. Why did this command behave differently in two directories? What made one explanation easier to remember than another? Which part of a repeated task required judgment, and which part merely required patience?

A question does not need to be novel to be useful. Its importance may come from the situation in which you asked it. A familiar answer can become interesting when you show why it was hard to apply, what assumption you brought to it, and which observation finally made it click. That context is often the part missing from a short definition or a polished tutorial.

I like to imagine a note as a conversation with someone arriving a little later. They can see the result, but they cannot see the detours. The note should help them reconstruct the path without asking them to repeat every wrong turn. It should make uncertainty visible without allowing uncertainty to swallow the whole page.

> A useful note does not have to close the question. It has to leave the question in a better condition than it found it.

### Keep the boundary visible

Write down what you observed, what you inferred, and what remains untested. These are different kinds of statements. Separating them makes a modest note more trustworthy and makes later revision easier. You can change an interpretation without erasing the event that led you to it.

## 3. Build a small loop, not a complicated system

It is tempting to solve the problem of writing by designing a system around it. You can choose a theme, compare editors, invent categories, and create a template for every possible kind of note. These activities produce visible progress. They can also fill the hours in which you might have written something that the system was meant to support.

For this imaginary practice, the loop has only four steps:

1. Capture a question while its context is still available.
2. Describe the smallest example that makes the question concrete.
3. Write an explanation you would be willing to revise.
4. Return later and add whatever changed your understanding.

The loop works best when returning is easy. A descriptive title matters more than an elaborate filing scheme. A short opening paragraph matters more than a perfect introduction. A link to the relevant example matters more than a long list of related resources that you have not yet read.

#### A small naming convention

A filename such as `2026-10-13-reading-a-small-program.md` contains a date and a recognizable subject. That is enough for a simple collection. More structure can be added when a real difficulty appears. The important thing is to let an actual retrieval problem guide the next decision, instead of preparing for every hypothetical future collection.

## 4. Tools should make a decision easier to see

A tool earns its place when you can explain which part of the work it improves. Consider a tiny script that estimates the reading length of a draft. It cannot tell you whether the essay is good. It cannot know whether a paragraph deserves its space. It can, however, make one piece of information visible before you decide whether to shorten the introduction.

Here is a deliberately simple example. It counts groups of characters separated by whitespace, so its estimate is intended for an English draft. It is a demonstration of an explicit rule, rather than a general solution for every language.

```python
from math import ceil


def estimate_reading_minutes(text, words_per_minute=220):
    if words_per_minute <= 0:
        raise ValueError("words_per_minute must be positive")

    word_count = len(text.split())
    return max(1, ceil(word_count / words_per_minute))


draft = "A small tool should make its assumptions visible."
print(estimate_reading_minutes(draft))
```

The `220` value is simply a chosen parameter for this example. A different reader, a difficult passage, or a page full of code may call for a different assumption. Keeping the parameter visible makes the tool easier to question. A number printed by a program should not quietly become an authority over the decision it was meant to inform.

### Write down the tradeoff

| Choice | What it helps with | What it leaves unresolved |
| --- | --- | --- |
| A short summary | Finding the subject quickly | Whether the argument is convincing |
| A reading estimate | Planning a brief reading session | The difficulty of the material |
| A category | Browsing related notes | Relationships across categories |
| A revision date | Seeing that a page has changed | Understanding why it changed |

The table is a reminder that a feature has a boundary. When that boundary is clear, the feature can be useful without pretending to solve the entire practice.

## 5. Read the draft at more than one scale

The first pass through a draft is often a sentence-level pass. You notice repeated words, a missing subject, or a paragraph that asks the reader to carry too many ideas at once. These repairs matter. But a page can contain clean sentences and still move in circles. A second pass should ask what each section contributes to the whole.

Try writing a one-line description beside every section. If two descriptions say the same thing, decide whether the repetition teaches something or merely occupies space. If a section has no clear description, ask whether it belongs in a separate note. Moving a paragraph is sometimes a better revision than polishing it again.

Then read the opening and ending together. The opening sets an expectation; the ending reveals whether the page kept it. You do not need to restate every point. You do need to give the reader a sense of where the inquiry has arrived and what remains outside its boundary.

### Read it on a small screen

A narrow screen makes some problems easier to notice. A long heading can dominate the page. A table can become difficult to scan. A code example may require horizontal scrolling. These are reasons to inspect the page, rather than reasons to avoid any complex material. The question is whether the presentation lets the reader follow the argument without unnecessary effort.

## 6. Publishing introduces a different kind of attention

A private note can rely on shorthand because its writer knows the situation. A public note needs enough context for a stranger to arrive. That shift does not require a formal voice or a complete biography. It requires noticing which sentences depend on information that exists only in your head.

Before publishing, ask a few ordinary questions:

- Can a reader identify the problem from the first few paragraphs?
- Have I explained the terms that matter to this particular argument?
- Can someone distinguish an example from a claim about the world?
- Do the links help the reader inspect something specific?
- Is there a clear place to stop, even if the larger question remains open?

These questions also change the writer's attention. When you expect to explain an experience later, you may become more careful about observing it now. The aim is not to turn every moment into material. It is to preserve a few moments accurately enough that they can support thought when you return to them.

## 7. Leave room for a second visit

The most interesting version of a note may be the one written after it has been useful once. You try the advice, discover an exception, or realize that the original question had two different meanings. Returning allows the page to record that change without turning its earlier version into a failure.

A revision can be small. Add a paragraph explaining the new condition. Replace an example that was misleading. Put a dated note beside a conclusion that no longer seems adequate. The reader does not need a complete diary of every edit; they need enough information to understand a meaningful change.

This is one reason a personal blog can remain valuable even when publishing is irregular. It becomes a collection of places you can revisit, with questions that have enough structure to survive the visit. The pages do not need to share a single grand thesis. They can share a habit of making assumptions visible and leaving useful traces.

---

A blank page asks for less than it seems to ask. Begin with one event, one question, and one attempt to explain it. Give the attempt a title that you can find again. Publish when the page is clear enough to be useful, and return when you have something specific to add. Over time, the collection can become a record of attention: not every thought you have had, but the ones you took care to understand.
