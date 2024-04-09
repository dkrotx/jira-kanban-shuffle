// ==UserScript==
// @name         JIRA Board Randomize Swimlanes
// @version      1
// @description  Add a Randomize button to JIRA board.
// @author       https://github.com/clintonmonk
// @match        https://*.atlassian.net/jira/software/projects/*/boards/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @grant        none
// ==/UserScript==


/**
 * Whether or not the provided swimlane is the "Unassigned" swimlane.
 */
const isUnassignedSwimlane = (swimlane) => {
  return Array.from(swimlane.querySelectorAll("div"))
  	.reduce(
    	(acc, childDiv) => acc || childDiv.textContent == "Unassigned",
    	false,
    );
}

/**
 * Randomizes the order of the swimlanes. Keeps "Unassigned" at the end.
 */
const randomizeSwimlanes = () => {
  // get swimlanes
  // original: const swimlanes = Array.from(document.querySelectorAll("div[data-test-id='platform-board-kit.ui.swimlane.swimlane-wrapper']"));
  //const swimlanes = Array.from(document.querySelectorAll("div[class='ghx-swimlane ghx-closed']"));
  const swimlanes = Array.from(document.querySelectorAll("div[swimlane-id]"));
  const parentElement = swimlanes[0].parentElement;

  // randomize using vanilla JS
  const randomizedSwimlanes = swimlanes
    .map(swimlane => ({
      swimlane,
      sort: isUnassignedSwimlane(swimlane) ? 1 : Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ swimlane }) => swimlane);

  // add to DOM
  const frag = document.createDocumentFragment();
  randomizedSwimlanes.forEach(swimlane => frag.appendChild(swimlane));
  parentElement.appendChild(frag);
}

/**
 * Find Insights button.
 */
const findInsightsButton = () => {
  // Search for a button with "insights" inside its innerHTML.
  // Previous approach: document.querySelector("button[data-testid='insights-show-insights-button.ui.insights-button']")
  let insightButton = null;
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    const innerHTML = button.innerHTML.toLowerCase();
    if (innerHTML.includes("board")) {
      insightButton = button;
    }
  });
  console.log("insightButton", insightButton);
  return insightButton;
}

/**
 * Adds a "Randomize" button.
 */
const addRandomizeButton = () => {
  console.log("Adding Randomize button...");

  // copy the Insights button
  const insightButton = findInsightsButton();
  const insightInnerDiv = insightButton.parentElement;
  const insightOuterDiv = insightInnerDiv.parentElement;

  const button = document.createElement("button");
  button.onclick = () => {randomizeSwimlanes()}
  button.className = insightButton.className;
  button.innerHTML = "Shuffle";

  const innerDiv = document.createElement("div");
  innerDiv.className = insightInnerDiv.className;
  innerDiv.appendChild(button);

  const outerDiv = document.createElement("div");
  outerDiv.className = insightOuterDiv.className;
  outerDiv.appendChild(innerDiv);

  // add to DOM right before the Insights button
  const parentNode = insightOuterDiv.parentElement;
  parentNode.insertBefore(innerDiv, insightOuterDiv);

  console.log("Shuffle button added!");
}

const waitForInsightsButton = (callback, timeRemaining) => {
  const interval = 200;
  const insightButton = findInsightsButton();
  if (insightButton) {
    callback();
  } else if (timeRemaining <= 0) {
    alert("Board button not found!");
  } else {
    setTimeout(() => {waitForInsightsButton(callback, timeRemaining - interval)}, interval);
  }
}

(function() {
  'use strict';
  waitForInsightsButton(addRandomizeButton, 5000);
})();
