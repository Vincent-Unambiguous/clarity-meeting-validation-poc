const topics = [
  {
    id: 'pilot', name: 'Pilot launch', icon: '◈', anchor: 'Clarity product',
    description: 'Scope, timing and readiness for the first pilot.',
    records: [
      { id: 'pilot-meaning', type: 'ambiguity', title: 'What does “ready for the pilot” mean?', summary: 'The phrase was used for both an internal walkthrough and a customer-facing release. Those lead to different launch plans.', options: ['Ready for an internal walkthrough', 'Ready for a customer-facing pilot'], source: '14:32 · Maya and Sam', quote: '“We can be ready for the pilot by Friday.” / “Do you mean ready to show the team, or ready for partners?”' },
      { id: 'pilot-interp', type: 'interpretation', title: 'Clarity linked “pilot” to the design-partner rollout', summary: 'I treated later references to “the pilot” as the two design-partner trial. Please check that this is the same initiative.', source: '16:08 · Sam', quote: '“Let’s keep the pilot to the two partners who already volunteered.”' },
      { id: 'pilot-action', type: 'action', title: 'Alex to share a pilot readiness checklist', summary: 'Prepare a short checklist covering access, onboarding and support. Owner: you. Target: before the next product sync.', source: '21:14 · Maya', quote: '“Alex, could you put together a readiness checklist before we meet again?”' },
      { id: 'pilot-decision', type: 'decision', title: 'Start with two design partners', summary: 'The first external trial will be limited to the two partners already in conversation with the team.', source: '18:42 · Sam', quote: '“Let’s start with those two partners, then expand once we have feedback.”' },
      { id: 'pilot-concern', type: 'concern', title: 'Support capacity may slow the rollout', summary: 'The team is unsure whether it can respond quickly to partner questions during the first week.', source: '20:05 · Priya', quote: '“I worry that we will not have enough support coverage in week one.”' }
    ]
  },
  {
    id: 'onboarding', name: 'Partner onboarding', icon: '◇', anchor: 'Clarity product',
    description: 'How new pilot partners will get started.',
    records: [
      { id: 'onboarding-meaning', type: 'ambiguity', title: 'Is onboarding self-serve or guided?', summary: 'The meeting described a “simple onboarding flow,” but did not establish whether a team member will guide each partner.', options: ['A team member guides each partner', 'Partners complete onboarding themselves'], source: '26:11 · Priya', quote: '“We need a simple onboarding flow. I can join the first call if that helps.”' },
      { id: 'onboarding-interp', type: 'interpretation', title: 'Clarity treated the welcome email as an onboarding step', summary: 'I grouped the proposed welcome email with onboarding rather than partner communications. Does that match your intent?', source: '28:02 · Alex', quote: '“The welcome email could carry the setup steps and a contact for questions.”' },
      { id: 'onboarding-action', type: 'action', title: 'Priya to draft the welcome email', summary: 'Draft a welcome message with setup steps and a support contact. Owner: Priya.', source: '29:40 · Priya', quote: '“I’ll draft that welcome email and send it round.”' },
      { id: 'onboarding-question', type: 'question', title: 'Who should receive partner setup requests?', summary: 'A single support contact for onboarding questions was discussed, but no person or channel was chosen.', source: '31:12 · Alex', quote: '“Where should their setup questions land?”' }
    ]
  },
  {
    id: 'reporting', name: 'Feedback & reporting', icon: '▤', anchor: 'Clarity product',
    description: 'How pilot learnings will be collected and shared.',
    records: [
      { id: 'reporting-interp', type: 'interpretation', title: 'Clarity read “weekly update” as an internal report', summary: 'I interpreted the proposed update as one for the product team, not a report sent to partners.', source: '37:28 · Maya', quote: '“A weekly update would help us see what is working.”' },
      { id: 'reporting-assumption', type: 'assumption', title: 'Partners will provide feedback every week', summary: 'The reporting plan appears to assume each design partner can share feedback on a weekly cadence.', source: '35:52 · Sam', quote: '“If we hear from them each week, we can keep the report light.”' },
      { id: 'reporting-discussion', type: 'discussion', title: 'How should pilot feedback be shared?', summary: 'Current understanding: the team wants a short recurring view of partner feedback. Open point: format and audience.', source: '38:06 · Maya', quote: '“Let’s work out whether that is a dashboard or just a short written update.”' },
      { id: 'reporting-question', type: 'question', title: 'What signals show the pilot is working?', summary: 'The group did not settle on success signals or a threshold for expanding beyond two partners.', source: '39:21 · Alex', quote: '“What would tell us this is good enough to expand?”' }
    ]
  }
];

const labels = { ambiguity: 'Ambiguity', interpretation: 'Agent interpretation', action: 'Action', decision: 'Decision', concern: 'Concern', question: 'Question', assumption: 'Assumption', discussion: 'Discussion' };
const symbols = { ambiguity: '◇', interpretation: '✧', action: '↗', decision: '✓', concern: '!', question: '?', assumption: '◌', discussion: '◈' };
const relevance = {
  'pilot-meaning': { scope: 'mine', reason: 'This changes the readiness checklist assigned to you.' },
  'pilot-interp': { scope: 'other', reason: 'A terminology interpretation for the rollout owner.' },
  'pilot-action': { scope: 'mine', reason: 'This action is assigned to you.' },
  'pilot-decision': { scope: 'general', reason: 'A decision affecting the whole pilot.' },
  'pilot-concern': { scope: 'general', reason: 'A concern relevant to the whole team.' },
  'onboarding-meaning': { scope: 'general', reason: 'An open point in the shared onboarding plan.' },
  'onboarding-interp': { scope: 'mine', reason: 'Clarity interpreted something you said.' },
  'onboarding-action': { scope: 'other', reason: 'This action is assigned to Priya.' },
  'onboarding-question': { scope: 'mine', reason: 'You raised this question in the meeting.' },
  'reporting-interp': { scope: 'other', reason: 'An interpretation of Maya’s statement.' },
  'reporting-assumption': { scope: 'general', reason: 'An assumption in the shared reporting plan.' },
  'reporting-discussion': { scope: 'general', reason: 'An open discussion for the whole team.' },
  'reporting-question': { scope: 'mine', reason: 'You raised this question in the meeting.' }
};
const state = { view: 'topics', myScope: 'with-general', showCompletedReview: false, topic: 'pilot', responses: {}, expanded: {}, choices: {}, quotes: {}, agenda: [] };
const allRecords = topics.flatMap(t => t.records);
const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const currentTopic = () => topics.find(t => t.id === state.topic);
const response = id => state.responses[id];
const topicComplete = topic => topic.records.every(record => response(record.id));
const allComplete = () => allRecords.every(record => response(record.id));
const mineRecords = () => allRecords.filter(record => relevance[record.id].scope === 'mine');
const generalRecords = () => allRecords.filter(record => relevance[record.id].scope === 'general');
const forMeRecords = () => [...mineRecords(), ...generalRecords()];
const forMeComplete = () => forMeRecords().every(record => response(record.id));
const priorityFirst = records => [...records].sort((a, b) => Number(['ambiguity', 'interpretation'].includes(b.type)) - Number(['ambiguity', 'interpretation'].includes(a.type)));

function overallCompletionHtml() {
  return `<div class="completion-message overall-message"><span class="completion-icon" aria-hidden="true">✳</span><div><span class="completion-kicker">MEETING REVIEW COMPLETE</span><h2>Every record has your input.</h2><p>You reviewed all ${allRecords.length} details from this meeting. Corrections and follow-ups stay visible, and you can revisit any response.</p></div></div>`;
}

function topicCompletionHtml(topic) {
  const feedbackCount = topic.records.filter(record => response(record.id)?.kind !== 'confirmed').length;
  const detail = feedbackCount ? `${feedbackCount} ${feedbackCount === 1 ? 'record has' : 'records have'} additional feedback for follow-up.` : 'Every record has your input.';
  return `<div class="completion-message topic-message"><span class="completion-icon" aria-hidden="true">✓</span><div><span class="completion-kicker">TOPIC REVIEW COMPLETE</span><h3>${escapeHtml(topic.name)} is reviewed.</h3><p>${detail} You can reopen any record if you want to change your response.</p></div></div>`;
}

function readOnlyRecordHtml(record) {
  const result = response(record.id);
  const topic = topics.find(item => item.records.includes(record));
  const status = { confirmed: 'Confirmed', flagged: 'Correction sent', context: 'Context added', agenda: 'For next meeting' }[result.kind];
  const detailLabel = { confirmed: result.text ? 'Meaning confirmed' : 'Confirmed as captured', flagged: 'Your correction', context: 'Your context', agenda: 'Suggested discussion' }[result.kind];
  const detail = result.text ? `<p><strong>${detailLabel}:</strong> ${escapeHtml(result.text)}</p>` : `<p>${detailLabel}</p>`;
  return `<article class="summary-record"><div><span class="record-type"><span class="type-symbol">${symbols[record.type]}</span>${labels[record.type]}<span class="record-topic-tag">· ${escapeHtml(topic.name)}</span></span><h3>${escapeHtml(record.title)}</h3>${detail}</div><span class="record-status ${result.kind}">${status}</span></article>`;
}

function render() {
  const reviewed = Object.keys(state.responses).length;
  const complete = allComplete();
  const forMe = forMeRecords();
  const reviewedForMe = forMe.filter(record => response(record.id)).length;
  const progressReviewed = state.view === 'mine' ? reviewedForMe : reviewed;
  const progressTotal = state.view === 'mine' ? forMe.length : allRecords.length;
  $('#progress-count').textContent = `${reviewed} of ${allRecords.length}`;
  $('.progress-content small').textContent = complete ? 'review complete' : 'items reviewed';
  $('.progress-card').classList.toggle('is-complete', complete);
  $('#progress-fill').style.width = `${reviewed / allRecords.length * 100}%`;
  $('#my-progress-count').textContent = `${reviewedForMe} of ${forMe.length}`;
  $('#my-progress-fill').style.width = `${reviewedForMe / forMe.length * 100}%`;
  $('.my-progress-card').classList.toggle('is-complete', forMeComplete());
  const progressComplete = state.view === 'mine' ? forMeComplete() : complete;
  $('#sticky-progress-count').textContent = progressComplete ? `${progressReviewed} of ${progressTotal} · Review complete` : `${progressReviewed} of ${progressTotal} items reviewed`;
  $('#sticky-progress-fill').style.width = `${progressReviewed / progressTotal * 100}%`;
  $('#sticky-progress').classList.toggle('is-complete', progressComplete);
  $('.sticky-progress-track').setAttribute('aria-valuenow', progressReviewed);
  $('.sticky-progress-track').setAttribute('aria-valuemax', progressTotal);
  $('#overall-completion').innerHTML = complete ? overallCompletionHtml() : '';
  $('#records-overall-completion').innerHTML = complete ? overallCompletionHtml() : '';
  $('#side-open-count').textContent = allRecords.length;
  $('#side-my-count').textContent = forMe.length;
  $('.app-shell').dataset.view = state.view;
  $('#topics-view').hidden = state.view !== 'topics';
  $('#my-records-view').hidden = state.view !== 'mine';
  $('#records-view').hidden = state.view !== 'records';
  const myAgenda = state.agenda.length ? `<div class="agenda-list-title">SUGGESTED FOR THE NEXT MEETING</div>${state.agenda.map(item => {
    const topic = topics.find(entry => entry.id === item.topic);
    return `<div class="agenda-item"><span>↗</span><div>${escapeHtml(item.text)}<small>${topic ? escapeHtml(topic.name) : 'No specific topic yet'}</small></div></div>`;
  }).join('')}` : '';
  document.querySelectorAll('[data-my-agenda-list]').forEach(list => { list.innerHTML = myAgenda; });
  document.querySelectorAll('.side-link[data-view]').forEach(link => {
    const active = link.dataset.view === state.view;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (state.view === 'mine') {
    $('#priority-section').innerHTML = '';
    $('#records-list').innerHTML = '';
    $('#all-records-list').innerHTML = '';
    const mine = mineRecords();
    const general = generalRecords();
    const summaryMode = forMeComplete() && !state.showCompletedReview;
    $('#my-review-page').hidden = summaryMode;
    $('#my-completion-page').hidden = !summaryMode;
    $('#view-summary-btn').hidden = !forMeComplete();
    if (summaryMode) {
      $('#my-records-list').innerHTML = '';
      $('#my-completion-count').textContent = forMe.length;
      const confirmed = forMe.filter(record => response(record.id)?.kind === 'confirmed').length;
      $('#my-completion-breakdown').textContent = `${confirmed} confirmed · ${forMe.length - confirmed} with feedback`;
      const summaryGroup = (title, records) => `<section class="my-summary-group"><div class="my-summary-group-head"><span class="section-kicker">${title}</span><span>${records.length} records</span></div><div class="my-summary-list">${priorityFirst(records).map(readOnlyRecordHtml).join('')}</div></section>`;
      $('#my-completion-list').innerHTML = summaryGroup('ASSIGNED TO YOU', mine) + summaryGroup('GENERAL MEETING CONTEXT', general);
      return;
    }
    $('#my-completion-list').innerHTML = '';
    const shown = state.myScope === 'mine' ? mine : forMe;
    const reviewedShown = shown.filter(record => response(record.id)).length;
    $('#mine-only-count').textContent = mine.length;
    $('#mine-general-count').textContent = mine.length + general.length;
    $('#my-records-meta').textContent = state.myScope === 'mine' ? `${reviewedShown} of ${shown.length} assigned items reviewed · Your full review is ${reviewedForMe} of ${forMe.length}` : `${reviewedShown} of ${shown.length} records reviewed · Includes shared meeting context`;
    document.querySelectorAll('[data-my-scope]').forEach(button => button.setAttribute('aria-pressed', button.dataset.myScope === state.myScope));
    const groupHtml = (title, description, records) => `<section class="my-records-group"><div class="my-records-group-head"><div><span class="section-kicker">${title}</span><p>${description}</p></div><span>${records.filter(record => response(record.id)).length} of ${records.length} reviewed</span></div><div class="my-records-group-list">${priorityFirst(records).map(record => {
      const topic = topics.find(item => item.records.includes(record));
      return recordHtml(record, ['ambiguity', 'interpretation'].includes(record.type), { topic: topic.name, reason: relevance[record.id].reason });
    }).join('')}</div></section>`;
    $('#my-records-list').innerHTML = groupHtml('ASSIGNED TO YOU', 'Items specifically assigned for your review, including your actions, statements, and questions.', mine) + (state.myScope === 'with-general' ? groupHtml('GENERAL MEETING CONTEXT', 'Shared decisions and open matters worth checking.', general) : '');
    return;
  }
  $('#my-records-list').innerHTML = '';
  if (state.view === 'records') {
    $('#priority-section').innerHTML = '';
    $('#records-list').innerHTML = '';
    $('#all-records-count').textContent = `${allRecords.length} records`;
    $('#all-records-list').innerHTML = topics.map(topic => {
      const priority = topic.records.filter(r => ['ambiguity', 'interpretation'].includes(r.type));
      const other = topic.records.filter(r => !['ambiguity', 'interpretation'].includes(r.type));
      const reviewedInTopic = topic.records.filter(r => response(r.id)).length;
      return `<section class="all-records-group" aria-labelledby="all-${topic.id}"><div class="all-records-group-head"><div><span class="section-kicker">TOPIC · ${escapeHtml(topic.anchor)}</span><h2 id="all-${topic.id}">${escapeHtml(topic.name)}</h2></div><span class="${topicComplete(topic) ? 'group-complete' : ''}">${topicComplete(topic) ? '✓ Review complete' : `${reviewedInTopic} of ${topic.records.length} reviewed`}</span></div><div class="all-records-group-list">${[...priority, ...other].map(r => recordHtml(r, priority.includes(r))).join('')}</div></section>`;
    }).join('');
    return;
  }
  $('#all-records-list').innerHTML = '';
  if (state.view === 'chat') {
    $('#priority-section').innerHTML = '';
    $('#records-list').innerHTML = '';
    return;
  }
  $('#topic-grid').innerHTML = topics.map(topic => {
    const done = topic.records.filter(r => response(r.id)).length;
    const priority = topic.records.filter(r => ['ambiguity', 'interpretation'].includes(r.type) && response(r.id)?.kind !== 'confirmed').length;
    const doneHere = topicComplete(topic);
    const nextBadge = doneHere ? `<span class="topic-badge done">✓ Review complete</span>` : priority ? `<span class="topic-badge urgent">${priority} need clarity</span>` : `<span class="topic-badge">${topic.records.length - done} to review</span>`;
    return `<button class="topic-card ${topic.id === state.topic ? 'selected' : ''} ${doneHere ? 'complete' : ''}" data-topic="${topic.id}" aria-pressed="${topic.id === state.topic}"><span class="topic-card-top"><span class="topic-icon">${doneHere ? '✓' : topic.icon}</span><span class="topic-arrow">↗</span></span><h3>${topic.name}</h3><p>${topic.description}</p><span class="topic-badges"><span class="topic-badge">${done}/${topic.records.length} reviewed</span>${nextBadge}</span></button>`;
  }).join('');
  $('#topic-select').innerHTML = topics.map(t => `<option value="${t.id}" ${t.id === state.topic ? 'selected' : ''}>${t.name}</option>`).join('');
  const topic = currentTopic();
  $('#review-heading').textContent = topic.name;
  $('#review-subtitle').textContent = `Concerning ${topic.anchor} · ${topic.records.length} details from this meeting`;
  const priority = topic.records.filter(r => ['ambiguity', 'interpretation'].includes(r.type));
  const regular = topic.records.filter(r => !['ambiguity', 'interpretation'].includes(r.type));
  $('#priority-section').innerHTML = `<div class="priority-banner"><span class="priority-banner-icon">✧</span><div><strong>First, make sure we understood correctly</strong><p>Unclear wording and Clarity's interpretations can affect the records below.</p></div></div><div class="priority-list">${priority.map(r => recordHtml(r, true)).join('')}</div>`;
  $('#records-count').textContent = `${regular.length} records`;
  $('#records-list').innerHTML = regular.map(r => recordHtml(r, false)).join('');
  $('#topic-completion').innerHTML = topicComplete(topic) ? topicCompletionHtml(topic) : '';
  const agenda = state.agenda.filter(item => item.topic === state.topic);
  $('#agenda-list').innerHTML = agenda.length ? `<div class="agenda-list-title">SUGGESTED FOR THE NEXT MEETING</div>${agenda.map(item => `<div class="agenda-item"><span>↗</span>${escapeHtml(item.text)}</div>`).join('')}` : '';
}

function recordHtml(record, priority, context = null) {
  const result = response(record.id);
  const status = result ? { confirmed: 'Confirmed', flagged: 'Correction sent', context: 'Context added', agenda: 'For next meeting' }[result.kind] : 'Needs review';
  const type = `<span class="record-type"><span class="type-symbol">${symbols[record.type]}</span>${labels[record.type]}${context ? `<span class="record-topic-tag">· ${escapeHtml(context.topic)}</span>` : ''}</span>`;
  const statusTag = `<span class="record-status ${result?.kind || ''}">${status}</span>`;
  if (result && !state.expanded[record.id]) {
    return `<article class="record-card ${record.type} ${priority ? 'priority' : 'compact'} resolved is-collapsed" id="${record.id}"><button class="record-collapsed-toggle" data-expand="${record.id}" aria-expanded="false" aria-label="Reopen ${escapeHtml(record.title)}"><span class="record-collapsed-main">${type}<span class="record-collapsed-title">${escapeHtml(record.title)}</span></span><span class="record-collapsed-end">${statusTag}<span class="record-chevron" aria-hidden="true">⌄</span></span></button></article>`;
  }
  const options = record.options ? `<div class="meaning-options">${record.options.map((option, i) => `<button class="meaning-option ${state.choices[record.id] === i ? 'chosen' : ''}" data-choice="${record.id}" data-index="${i}" aria-pressed="${state.choices[record.id] === i}"><span></span>${escapeHtml(option)}</button>`).join('')}</div>` : '';
  const quote = state.quotes[record.id] ? `<blockquote class="source-quote">${escapeHtml(record.quote)}</blockquote>` : '';
  const feedback = result?.text ? `<div class="record-feedback"><strong>Your feedback:</strong> ${escapeHtml(result.text)}</div>` : '';
  const confirmText = record.type === 'ambiguity' ? 'Confirm meaning' : record.type === 'interpretation' ? 'Confirm interpretation' : 'Confirm';
  return `<article class="record-card ${record.type} ${priority ? 'priority' : 'compact'} ${result ? 'resolved' : ''}" id="${record.id}"><div class="record-top">${type}<span class="record-top-end">${statusTag}${result ? `<button class="record-hide" data-collapse="${record.id}" aria-expanded="true">Hide details ↑</button>` : ''}</span></div><h4>${escapeHtml(record.title)}</h4>${context ? `<div class="record-relevance">${escapeHtml(context.reason)}</div>` : ''}<p class="record-summary">${escapeHtml(record.summary)}</p>${options}<div class="record-source">⌁ <button data-source="${record.id}">${state.quotes[record.id] ? 'Hide' : 'View'} transcript excerpt</button> · ${escapeHtml(record.source)}</div>${quote}${feedback}<div class="record-actions"><button class="confirm-action" data-confirm="${record.id}">${confirmText}</button><button data-feedback="${record.id}" data-mode="flagged">Correct this</button><button class="subtle-action" data-feedback="${record.id}" data-mode="context">+ Add context</button><button class="subtle-action" data-agenda="${record.id}">↗ Next meeting</button></div></article>`;
}

function setTopic(id) { state.topic = id; render(); $('#review').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
function setView(view) {
  const wasTopics = state.view === 'topics';
  if (view === 'mine' && forMeComplete()) state.showCompletedReview = false;
  state.view = view;
  render();
  if (view === 'topics' && wasTopics) $('#topics').scrollIntoView({ behavior: 'smooth', block: 'start' });
  else window.scrollTo({ top: 0, behavior: 'instant' });
  updateStickyProgress();
}
function findRecord(id) { return allRecords.find(r => r.id === id); }
function toast(message) { const el = $('#toast'); el.textContent = message; el.classList.add('visible'); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('visible'), 2700); }
function saveResponse(recordId, value, defaultMessage) {
  const topic = topics.find(item => item.records.some(record => record.id === recordId));
  const wasTopicComplete = topicComplete(topic);
  const wasAllComplete = allComplete();
  const wasForMeComplete = forMeComplete();
  state.responses[recordId] = value;
  delete state.expanded[recordId];
  if (!wasForMeComplete && forMeComplete()) {
    state.view = 'mine';
    state.showCompletedReview = false;
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
    updateStickyProgress();
    return;
  }
  render();
  if (!wasAllComplete && allComplete()) toast('All reviews complete. Thank you for making this meeting clearer.');
  else if (!wasTopicComplete && topicComplete(topic)) toast(`${topic.name} review complete. Nicely done.`);
  else toast(defaultMessage);
}
let dialogContext = null;
function openDialog(context) {
  dialogContext = context;
  const isAgenda = context.mode === 'agenda-new' || context.mode === 'agenda';
  $('#agenda-topic-field').hidden = !(context.mode === 'agenda-new' && context.fromMy);
  if (context.mode === 'agenda-new' && context.fromMy) {
    $('#agenda-topic').innerHTML = `<option value="">No specific topic yet</option>${topics.map(topic => `<option value="${topic.id}">${escapeHtml(topic.name)}</option>`).join('')}`;
  }
  $('#dialog-kicker').textContent = isAgenda ? 'NEXT MEETING' : context.mode === 'flagged' ? 'CORRECT THE RECORD' : 'SHARE CONTEXT';
  $('#dialog-title').textContent = isAgenda ? 'Suggest a discussion' : context.mode === 'flagged' ? 'What should we correct?' : 'Add your context';
  $('#dialog-description').textContent = isAgenda ? 'We will keep this as a suggested agenda item for the next meeting.' : context.mode === 'flagged' ? 'Tell Clarity what was inaccurate. Your correction will be visible in this review.' : 'Add a detail that would help others understand this record.';
  $('#feedback-label').textContent = isAgenda ? 'What should the team discuss?' : 'Your feedback';
  $('#feedback-text').placeholder = isAgenda ? 'For example: Agree what “pilot ready” means before launch.' : context.mode === 'flagged' ? 'What should the record say instead?' : 'Add a helpful detail...';
  $('#feedback-text').value = '';
  $('#dialog-submit').textContent = isAgenda ? 'Suggest discussion' : 'Save feedback';
  $('#feedback-dialog').showModal();
  $('#feedback-text').focus();
}
function chatMessage(text, who = 'bot') { const el = document.createElement('div'); el.className = `chat-message ${who}`; el.textContent = text; $('#chat-log').appendChild(el); $('#chat-log').scrollTop = $('#chat-log').scrollHeight; }
function sendChat(question) {
  $('#prompt-area').hidden = true;
  $('.assistant-intro').hidden = true;
  chatMessage(question, 'user');
  chatMessage(chatReply(question));
}
function chatReply(message) {
  const q = message.toLowerCase(); const topic = currentTopic();
  if (q.includes('ambiguit') || q.includes('unclear')) return `In ${topic.name}, ${topic.records.filter(r => r.type === 'ambiguity').map(r => r.title).join(' and ') || 'I found no ambiguity'}. Choose a meaning in the review, or correct my reading.`;
  if (q.includes('decid')) return topic.records.some(r => r.type === 'decision') ? topic.records.filter(r => r.type === 'decision').map(r => `${r.title}. ${r.summary}`).join('\n') : `I did not find an explicit decision in ${topic.name}. You can suggest the open matter for the next meeting.`;
  if (q.includes('correct') || q.includes('wrong') || q.includes('disput')) return 'Use “Correct this” on any record and tell me what should change. I will mark it as needing correction in this prototype.';
  if (q.includes('action') || q.includes('owner')) return topic.records.filter(r => r.type === 'action').map(r => `${r.title}. ${r.summary}`).join('\n') || `No action was assigned under ${topic.name}.`;
  if (q.includes('next meeting') || q.includes('agenda')) return 'Use “Next meeting” on a record, or “Suggest agenda item” below the records. Both capture a follow-up discussion.';
  if (q.includes('source') || q.includes('transcript') || q.includes('evidence')) return 'Each record has a “View transcript excerpt” link so you can check the wording that Clarity used.';
  return `For ${topic.name}, I can explain the ambiguities, interpretations, decisions, actions, or source excerpts. You can also correct a record or suggest a discussion for next time.`;
}

document.addEventListener('click', event => {
  const target = event.target.closest('button'); if (!target) return;
  if (target.dataset.view) return setView(target.dataset.view);
  if (target.dataset.completionEdit !== undefined) { state.showCompletedReview = true; render(); window.scrollTo({ top: 0, behavior: 'instant' }); updateStickyProgress(); return; }
  if (target.dataset.completionSummary !== undefined) { state.showCompletedReview = false; render(); window.scrollTo({ top: 0, behavior: 'instant' }); updateStickyProgress(); return; }
  if (target.dataset.myScope) { state.myScope = target.dataset.myScope; render(); return; }
  if (target.dataset.newAgenda === 'mine') return openDialog({ mode: 'agenda-new', fromMy: true });
  if (target.dataset.topic) return setTopic(target.dataset.topic);
  if (target.dataset.expand) { state.expanded[target.dataset.expand] = true; render(); return; }
  if (target.dataset.collapse) { delete state.expanded[target.dataset.collapse]; render(); return; }
  if (target.dataset.choice) {
    const id = target.dataset.choice;
    const choice = Number(target.dataset.index);
    if (state.choices[id] !== choice && response(id)?.kind === 'confirmed') delete state.responses[id];
    state.choices[id] = choice;
    render(); return;
  }
  if (target.dataset.source) { state.quotes[target.dataset.source] = !state.quotes[target.dataset.source]; render(); return; }
  if (target.dataset.confirm) {
    const record = findRecord(target.dataset.confirm);
    if (record.type === 'ambiguity' && state.choices[record.id] === undefined) { toast('Choose a meaning first, or tell us what is missing.'); document.getElementById(record.id).querySelector('.meaning-options').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    saveResponse(record.id, { kind: 'confirmed', text: record.options ? record.options[state.choices[record.id]] : '' }, 'Confirmed. Thank you for checking this.'); return;
  }
  if (target.dataset.feedback) return openDialog({ id: target.dataset.feedback, mode: target.dataset.mode });
  if (target.dataset.agenda) return openDialog({ id: target.dataset.agenda, mode: 'agenda' });
  if (target.dataset.prompt) { sendChat(target.dataset.prompt); return; }
});
$('#topic-select').addEventListener('change', event => setTopic(event.target.value));
$('#new-agenda-btn').addEventListener('click', () => openDialog({ mode: 'agenda-new', topic: state.topic }));
$('#dialog-close').addEventListener('click', () => $('#feedback-dialog').close());
$('#dialog-cancel').addEventListener('click', () => $('#feedback-dialog').close());
$('#feedback-form').addEventListener('submit', event => {
  event.preventDefault(); const text = $('#feedback-text').value.trim();
  if (!text) { $('#feedback-text').focus(); return; }
  $('#feedback-dialog').close();
  if (dialogContext.mode === 'agenda-new') { state.agenda.push({ topic: dialogContext.fromMy ? $('#agenda-topic').value || null : dialogContext.topic, text }); toast('Discussion suggested for the next meeting.'); }
  else saveResponse(dialogContext.id, { kind: dialogContext.mode === 'agenda' ? 'agenda' : dialogContext.mode, text }, dialogContext.mode === 'agenda' ? 'Added to the next meeting suggestions.' : 'Feedback saved for this review.');
  if (dialogContext.mode === 'agenda-new') render();
});
$('#chat-form').addEventListener('submit', event => { event.preventDefault(); const input = $('#chat-input'); const question = input.value.trim(); if (!question) return; sendChat(question); input.value = ''; });
const savedTheme = localStorage.getItem('clarity-theme');
const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  $('#theme-label').textContent = theme.toUpperCase();
  $('#chat-theme-label').textContent = theme.toUpperCase();
  $('#theme-toggle').setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
  $('#chat-theme-toggle').setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#151515' : '#f8f8f6';
  localStorage.setItem('clarity-theme', theme);
}
$('#theme-toggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));
$('#chat-theme-toggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));
function updateStickyProgress() {
  const heading = state.view === 'topics' ? $('.welcome-row') : state.view === 'mine' ? forMeComplete() && !state.showCompletedReview ? $('.my-completion-hero') : $('.my-records-header') : state.view === 'records' ? $('.records-view-header') : null;
  $('#sticky-progress').hidden = !heading || heading.getBoundingClientRect().bottom > 0;
}
window.addEventListener('scroll', updateStickyProgress, { passive: true });
window.addEventListener('resize', updateStickyProgress);
setTheme(initialTheme);
render();
requestAnimationFrame(updateStickyProgress);
