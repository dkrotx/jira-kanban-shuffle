# jira-kanban-shuffle
Script to shuffle swimlanes on JIRA Kanban board

# A problem
Usually during standup meetings you don't want people to report in the same order.
At the same time, there is no feature that provides shuffle in vanilla JIRA setup. Nor the JQL function yet.

# Solution
This Tampermonkey script solves this by:
- looking for "Board" button
- placing a new, "Shuffle" button next to it
- when you click on it, the swimlanes are shuffled

# How to install?
You may wonder - how to install if it is just a script?!
You need (Tampermonkey plugin)[https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo] for this. This Chrome extension allows you to run JS on specific sites/pages.
Just create a new script adding the content of shuffle.js as is, and add your JIRA' URL to User matches (script Settings, Includes/Excludes).
You're good to go!


# Alternatives
## (jira-randomize script)[https://github.com/clintonmonk/jira-randomize].
I had to modify it since our Jira setup has different HTML layout. There is no "Insights" button, nor the expected div-layout.

## (Jira Swimlane Shuffler)[https://chromewebstore.google.com/detail/jira-swimlane-shuffler/gdhfapkplpdajkphekdajbobkndhpkdk]
A plugin for Google Chrome. The downside of it - you can't drag tasks between states (like "In progress" to "Done" column), and it is critical for us.
