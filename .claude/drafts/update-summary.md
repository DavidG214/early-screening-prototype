---
description: Regenerate SUMMARY.md from the repo and post it as a new Google Doc in the shared team folder
---
<!-- DRAFT. To activate: copy this file to .claude/commands/update-summary.md, then run /update-summary in Claude Code. -->
<!-- Fill in SHARED_FOLDER_ID once, after David creates and shares the Drive folder by hand. -->

1. Follow the instructions in .claude/drafts/summary-prompt.txt and overwrite SUMMARY.md in the repo root.
2. Show me the new SUMMARY.md and wait for me to say "ok" before uploading.
3. After I say ok, call the Google Drive create_file tool with:
   - title: "Screener summary - <YYYY-MM-DD HH:mm>"
   - parentId: SHARED_FOLDER_ID
   - textContent: the full SUMMARY.md text
   - contentMimeType: "text/markdown"
   (Leave conversion on, so it becomes a Google Doc.)
4. Reply with the new doc's link. Do not change any sharing settings and do not delete older docs.
5. Commit SUMMARY.md with the message "Update project summary".

