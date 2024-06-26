# jira-kanban-shuffle
A script which adds a shuffle button to randomize swimlanes on JIRA Kanban board

![demo](https://github.com/dkrotx/jira-kanban-shuffle/assets/1651393/58809d78-e8ed-488c-a0df-7fd4db7e87b6)

# Problem
Usually during standup meetings you don't want people to report in the same order every day as it makes it look more like report and less engaging.
At the same time, there is no built-in Jira feature to leverage this.

# Solution
This TamperMonkey script solves this by slightly modifying page and moving the blocks which correspond to swimlanes. Specifially:
- It looks for the "Board" button
- Inserts a new, "Shuffle" button next to it
- Shuffles swimlanes when the button is clicked

# How to install?
First, you to install [TamperMonkey plugin](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) for this.  
This Chrome extension allows you to run custom JS on sites/pages you specify.

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
