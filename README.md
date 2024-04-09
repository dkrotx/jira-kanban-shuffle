# jira-kanban-shuffle
Script to shuffle swimlanes on JIRA Kanban board

# A problem
Usually during standup meetings you don't want people to report in the same order.
At the same time, there is no feature that provides shuffle in vanilla JIRA setup. Nor the JQL function yet.

# Solution
This TamperMonkey script solves this by:
- looking for "Board" button
- placing a new, "Shuffle" button next to it
- when you click on it, the swimlanes are shuffled

# How to install?
You may wonder - how to install if it is just a script?!
You need [TamperMonkey plugin](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) for this. This Chrome extension allows you to run custom JS on sites/pages you specify.

1. Click on the extention, "create a new script"
2. Add the content of shuffle.js as is
3. And your JIRA' URL to "User matches" (script Settings, Includes/Excludes).  
   For instance, in my case it is `https://t3.uberinternal.com/secure/RapidBoard.jspa*`

You should be good to go!  
Just open your Kanban board, and you should see a new "Shuffle" button as on the above image.

## Wait, isn't that dangerous?
You right, installing a script from someone's github repo to Tampermonkey is, indeed, potentially dangerous.
That's why the script is just a single, short and easy-to-read file.
You're free to go over and verify it only does shuffle and nothing else. I did the same with the original script.

## It doesn't work for me
Oops. Maybe your Kanban board' layout is a bit different - most probably a different Jira version.
Feel free to PR the patch wich works for you. I also open to discuss on how to make the approach more generic.

# Alternatives
## Jira-randomize script
[jira-randomize script](https://github.com/clintonmonk/jira-randomize). The one I took this code originally.
I had to modify it since our Jira setup has different HTML layout. There is no "Insights" button, nor the expected div-layout.

## Jira Swimlane Shuffler
[A plugin](https://chromewebstore.google.com/detail/jira-swimlane-shuffler/gdhfapkplpdajkphekdajbobkndhpkdk) for Google Chrome.
The downside of it - you can't drag tasks between states (like "In progress" to "Done" column), and it is critical for us.
