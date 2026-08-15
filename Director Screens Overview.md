# **Directors Module**

# **Director Screen Specifications**

# **_Screen ID: SCR-DIR-001 - Director Dashboard_**

| Field       | Value                              |
| ----------- | ---------------------------------- |
| Screen ID   | SCR-DIR-001                        |
| Screen Name | Director Dashboard                 |
| User Role   | Director                           |
| Platform    | Web / Desktop (Responsive), Tablet |

## Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Provide the Director with a high-level overview of foundation operations, key metrics, and quick access to core Director functions.

**Pre-Conditions:** User logged in as Director.

**Post-Conditions:** User navigates to the required Director function.

## Components & Interaction Details

| Component            | Type            | Description                                 | Validation / Behavior                                                                                              |
| -------------------- | --------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Header               | Text            | Director Dashboard with Foundation logo     | Static                                                                                                             |
| Date/Time            | Read-only       | Current date and time                       | Auto-updates                                                                                                       |
| Quick Stats Cards    | Cards           | Key foundation metrics                      | Total Students, Active Teachers, Pending Mastery Approvals, Unread Parent Messages, Session Reports Pending Review |
| Recent Activity Feed | Scrollable List | Recent actions requiring Director attention | Click item to navigate                                                                                             |
| Quick Action Buttons | Buttons         | Common Director actions                     | Staff Scheduling, Mastery Approval, Parent Communication, Reports                                                  |
| Notifications Bell   | Icon            | Unread notifications                        | Displays notification count                                                                                        |

# **_Screen ID: SCR-DIR-002 - Staff Scheduling_**

| Field       | Value                              |
| ----------- | ---------------------------------- |
| Screen ID   | SCR-DIR-002                        |
| Screen Name | Staff Scheduling                   |
| User Role   | Director                           |
| Platform    | Web / Desktop (Responsive), Tablet |

## Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Enable operational scheduling by linking teachers to students for specific session blocks.

### Pre-Conditions

- Teachers exist in the system.
- Students exist in the system.
- Session blocks are configured.
- Capacity limits are configured.

### Post-Conditions

Teacher-to-student assignments are saved and reflected in teacher session dashboards.

## Components & Interaction Details

| Component              | Type                 | Description                | Validation / Behavior                                 |
| ---------------------- | -------------------- | -------------------------- | ----------------------------------------------------- |
| Teacher Selector       | Dropdown / Search    | Select teacher schedule    | Required                                              |
| Schedule View          | Calendar / Grid      | Teacher schedule           | Displays assigned students and blocks                 |
| Add Assignment         | Button               | Create assignment          | Opens Assignment Editor                               |
| Edit Assignment        | Button               | Modify assignment          | Opens Assignment Editor                               |
| Assignment Editor      | Modal                | Manage student assignments | Station, Block, Available Students, Assigned Students |
| Capacity Indicator     | Badge                | Student count vs capacity  | Visual warning when exceeded                          |
| Save Assignment        | Button               | Save assignment changes    | Capacity validation                                   |
| Cancel                 | Button               | Discard changes            | Confirmation if unsaved                               |
| Remove All Assignments | Button               | Clear block assignments    | Confirmation required                                 |
| View Teacher Summary   | Button               | View schedule summary      | Read-only                                             |
| Conflict Detection     | Automated Validation | Prevent double booking     | Warning displayed                                     |

# **_Screen ID: SCR-DIR-003 - Goal Mastery Approval_**

> **Note:** When the Program Director is the approver instead of the Director, the same screen is reused under the Program Director module (referenced as **SCR-PD-009**). SCR-PD-009 has no separate specification - it is SCR-DIR-003 accessed by the Program Director role.

| Field       | Value                              |
| ----------- | ---------------------------------- |
| Screen ID   | SCR-DIR-003                        |
| Screen Name | Goal Mastery Approval              |
| User Role   | Director / Program Director        |
| Platform    | Web / Desktop (Responsive), Tablet |

## Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Review and approve goals that have completed Teacher B and Teacher C verification.

### Pre-Conditions

- Goal submitted for mastery verification.
- Teacher B verification completed.
- Teacher C verification completed.
- Goal awaiting Director approval.

### Post-Conditions

- Approved goals become Mastered and archived.
- Rejected goals return to Teacher A with feedback.

## Components & Interaction Details

| Component                 | Type       | Description                               | Validation / Behavior                                                                                                   |
| ------------------------- | ---------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Pending Approval List     | Table      | Goals awaiting approval                   | Click row for details<br><br>Columns: Student Name, Goal Name, Teacher A, Teacher B, Teacher C, Date Submitted, Actions |
| Filter Controls           | Dropdowns  | Filter by student, teacher, station, date | Dynamic filtering                                                                                                       |
| Search                    | Text Input | Search students                           | Real-time filtering                                                                                                     |
| View Verification Details | Button     | Opens modal showing all verification data | Shows: Teacher A mastery data, Teacher B outcome & notes, Teacher C outcome & notes                                     |
| View Trial Log            | Button     | Opens chronological trial history         | Shows all trials logged by Teacher A for this goal                                                                      |
| Approval Detail View      | Modal      | Full goal review information              | Student, Goal, Teacher A/B/C data                                                                                       |
| Approve Button            | Button     | Approve mastery                           | Confirmation required                                                                                                   |
| Reject Button             | Button     | Reject mastery request                    | Feedback required                                                                                                       |
| Notes Field               | Text Area  | Director notes                            | Optional                                                                                                                |
| Print / Export            | Button     | Export approval record                    | PDF output                                                                                                              |

# **_Screen ID: SCR-DIR-004 - Parent Communication_**

| Field       | Value                              |
| ----------- | ---------------------------------- |
| Screen ID   | SCR-DIR-004                        |
| Screen Name | Parent Communication               |
| User Role   | Director                           |
| Platform    | Web / Desktop (Responsive), Tablet |

## Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Centralized communication hub for all parent interactions.

### Pre-Conditions

- Parent accounts exist.
- Messages or updates exist.

### Post-Conditions

Messages are sent and communication history is maintained.

## Components & Interaction Details

| Component               | Type           | Description                     | Validation / Behavior             |
| ----------------------- | -------------- | ------------------------------- | --------------------------------- |
| Conversation List       | List           | Active parent conversations     | Displays unread status            |
| Filter Controls         | Dropdowns      | Filter conversations            | Student, Sender, Date             |
| Search                  | Text Input     | Search conversations            | Real-time filtering               |
| Conversation View       | Chat Interface | View conversation thread        | Message history and response area |
| Send Message            | Button         | Send message                    | Message required                  |
| Mark Read / Unread      | Button         | Manage read status              | Toggle state                      |
| Escalate to Director    | Button         | Flag conversation               | Creates Director notification     |
| Communication Log       | Tab / Button   | Historical communication record | Read-only                         |
| Print Communication Log | Button         | Export communication history    | PDF output                        |

# **_Screen ID: SCR-DIR-005 - Reports & Oversight_**

| Field       | Value                      |
| ----------- | -------------------------- |
| Screen ID   | SCR-DIR-005                |
| Screen Name | Reports & Oversight        |
| User Role   | Director                   |
| Platform    | Web / Desktop (Responsive) |

## Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Provide reporting, oversight, and analytics capabilities across the foundation.

**Pre-Conditions:** Session and student data exist.

**Post-Conditions:** Reports generated, reviewed, exported, or shared.

## Components & Interaction Details

| Component                     | Type            | Description                     | Validation / Behavior                                                     |
| ----------------------------- | --------------- | ------------------------------- | ------------------------------------------------------------------------- |
| Report Type Selector          | Tabs            | Report categories               | Session Reports, Bi-Annual Reports, Student Progress, Foundation Overview |
| Filter Controls               | Filters         | Student, Teacher, Station, Date | Dynamic updates                                                           |
| Student Selector              | Search Dropdown | Select student                  | Required for student reports                                              |
| Session Reports List          | Table           | Submitted session summaries     | Read-only access                                                          |
| Student Progress Chart        | Chart           | Goal progress over time         | Interactive                                                               |
| Bi-Annual Report Generator    | Button          | Generate report                 | Validates available data                                                  |
| Preview PDF                   | Button          | Preview report                  | PDF viewer                                                                |
| Download PDF                  | Button          | Download report                 | File export                                                               |
| Email Report to Parent        | Button          | Share report                    | Uses Parent Communication                                                 |
| Foundation Overview Dashboard | Dashboard       | Aggregate metrics               | Foundation-wide analytics                                                 |
| Export Overview               | Button          | Export dashboard                | PDF or CSV                                                                |

# **_Screen ID: SCR-DIR-006 - Student Progress Monitoring_**

| Field       | Value                              |
| ----------- | ---------------------------------- |
| Screen ID   | SCR-DIR-006                        |
| Screen Name | Student Progress Monitoring        |
| User Role   | Director                           |
| Platform    | Web / Desktop (Responsive), Tablet |

## Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Provide a detailed, student-level view of assessments, goals, sessions, and behavior trends.

**Pre-Conditions:** Student selected.

**Post-Conditions:** Director can review comprehensive student progress.

## Components & Interaction Details

| Component                | Type              | Description                 | Validation / Behavior                    |
| ------------------------ | ----------------- | --------------------------- | ---------------------------------------- |
| Student Selector         | Dropdown / Search | Select student              | Required                                 |
| Student Profile Summary  | Card              | Student overview            | Links to Student Profile                 |
| Assessment Summary       | Section           | Assessment results overview | Skills, Behavior, Preference assessments |
| Current Goals            | Section           | Active goals                | Progress percentages displayed           |
| Session History          | Table             | Completed sessions          | Read-only access                         |
| Behavior Incident Trends | Chart / List      | Incident analysis           | Trend visualization                      |
| Goal Progress Chart      | Line Chart        | Goal progress over time     | Downloadable                             |
| Notes Section            | Text Area         | Internal Director notes     | Timestamped                              |
| Print Report             | Button            | Generate student report     | PDF export                               |

# **Program Director Screen Specifications**

# **_Screen ID: SCR-PD-001 - Program Director Dashboard_**

## Screen Information

| Field       | Value                            |
| ----------- | -------------------------------- |
| Screen ID   | SCR-PD-001                       |
| Screen Name | Program Director Dashboard       |
| User Role   | Program Director                 |
| Platform    | Web/Desktop (Responsive), Tablet |

### Purpose, Pre-Conditions & Post-Conditions

### **Purpose**: Provide the Program Director with a centralized dashboard that aggregates all students in the assessment-to-IUP pipeline, highlights students ready for IUP creation, and provides quick access to assessment data and goal assignment tools

### **Pre**\-**Conditions**: User logged in as Program Director

### **Post**\-**Conditions**: User navigates to the desired sub-screen (Assessment Review, IUP Generation, Goal Assignment, etc.)

### Components & Interaction Details

| Component                | Type               | Description                                                        | Validation / Behavior                                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header                   | Text               | "Program Director Dashboard"                                       | Static.                                                                                                                                                                                                                                                                               |
| Quick Stats Cards        | Cards (Grid)       | Display key metrics relevant to the Program Director.              | Each card shows a number and label, with a link to the relevant screen.- Students in Assessment: # (links to SCR-PD-002)- Assessment Complete (Ready for IUP): # (links to SCR-PD-003)- Active IUP Plans: # (links to SCR-PD-004)- Goals Assigned This Month: # (links to SCR-PD-005) |
| Assessment Pipeline View | Visual Flow / List | Shows students progressing through the assessment-to-IUP pipeline. | Stages:1. In Assessment - Students currently undergoing 6-week assessment <br>2\. Assessment Complete - Students ready for IUP creation <br>3\. IUP Created - Students with active IUPs <br>Click any stage to filter and navigate to the relevant list.                              |
| Recent Activity Feed     | Scrollable List    | Shows recent actions requiring Program Director attention.         | Examples:- "Assessment completed for Student X - Ready for IUP"- "IUP draft saved for Student Y"- "Goal Bank updated with new goal: 'Toileting Independence'"                                                                                                                         |
| Quick Action Buttons     | Buttons            | Direct links to common Program Director tasks.                     | \- Review Assessments → SCR-PD-002- Generate IUP → SCR-PD-003- Assign Goals → SCR-PD-005- View Goal Bank → SCR-PD-006                                                                                                                                                                 |
| Notifications Bell       | Icon               | Indicates unread notifications.                                    | Red badge shows count. Click opens notification panel (assessment completions, IUP draft reminders, etc.).                                                                                                                                                                            |

# **_Screen ID: SCR-PD-002 - Assessment Review & Approval_**

| Field       | Value                            |
| ----------- | -------------------------------- |
| Screen ID   | SCR-PD-002                       |
| Screen Name | Assessment Review & Approval     |
| User Role   | Program Director                 |
| Platform    | Web/Desktop (Responsive), Tablet |

### Purpose, Pre-Conditions & Post-Conditions

### Purpose: Provide the Program Director with a comprehensive view of all completed and in-progress 6-week assessments

### Pre-Conditions:Assessment data exists (SCR-010, SCR-012, Skills/Behavior assessments)

### Post-Conditions: Assessments are reviewed, marked as "Ready for IUP", and the student status is updated

### Components & Interaction Details

| Component                    | Type                                  | Description                                                                | Validation / Behavior                                                                                                                                                                                                                                                                                                                 |
| ---------------------------- | ------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Assessment List              | Scrollable Table                      | Displays all students with assessment data.                                | Columns:- Student Name- Age- Program/Group- Assessment Status (In Progress, Complete, Reviewed)- Date Completed- Actions (View Report, Mark as Reviewed)                                                                                                                                                                              |
| Filter Controls              | Dropdowns / Date Pickers              | Filter assessments by Student, Program, Group, Status, or Date Range.      | Reduces the list to relevant items.                                                                                                                                                                                                                                                                                                   |
| Search                       | Text Input                            | Search assessments by Student Name.                                        | Real-time filter.                                                                                                                                                                                                                                                                                                                     |
| View Report                  | Button                                | Opens the Assessment Summary Report (SCR-015) for the selected student.    | Displays:- Student Information (auto-populated)- Skills Assessment (ABLLS): Summary scores, need map, and detailed domain results- Behavior Assessment (MASS/FAST): Questionnaire results, identified behavior functions- Preference Assessment: Ranked list of top preferred items- IUP Status: Indicates if an IUP has been created |
| Assessment Summary Dashboard | Visual Dashboard (within View Report) | Graphical summary of assessment data.                                      | \- Skills Radar Chart: Visual representation of ABLLS domain scores- Behavior Function Summary: Pie chart or bar chart showing identified behavior functions- Top Preferences: Ranked list with icons                                                                                                                                 |
| Mark as Reviewed             | Button                                | Marks the assessment as reviewed and indicates readiness for IUP creation. | Confirmation dialog: "Mark this assessment as reviewed and ready for IUP creation?"Updates student status to "Ready for IUP".                                                                                                                                                                                                         |
| Generate Assessment PDF      | Button                                | Downloads the complete assessment report as a PDF.                         | Named: \[StudentName\]\_AssessmentSummary_\[Date\].pdf                                                                                                                                                                                                                                                                                |
| Notes                        | Text Area                             | Allows the Program Director to add internal notes about the assessment.    | Not visible to parents or teachers (internal use only). Timestamp and author logged.                                                                                                                                                                                                                                                  |

# **_Screen ID: SCR-PD-003 - IUP Generation & Management_**

## Screen Information

| Field       | Value                            |
| ----------- | -------------------------------- |
| Screen ID   | SCR-PD-003                       |
| Screen Name | IUP Generation & Management      |
| User Role   | Program Director                 |
| Platform    | Web/Desktop (Responsive), Tablet |

> **Note:** This screen is also specified as **SCR-014** ("IUP Creation & Goal Assignment") in `Screens Set 2.md`. Both IDs refer to the same screen; this spec is the authoritative, detailed version.

### Purpose, Pre-Conditions & Post-Conditions

### Purpose: Enable the Program Director to create a comprehensive Individualized Behavior Intervention Plan (IUP) for a student, using data from the 6-week assessment to inform clinical decisions. The IUP includes student information, assessment summary, selected goals (up to 2 per station), and intervention strategies

### Pre-Conditions

### Student has completed the 6-week assessment (SCR-010, SCR-012)

### Student status is "Ready for IUP" or "IUP Draft"

### Assessment data is available for review

### Post-Conditions

### IUP is created and saved (as draft or finalized)

### Goals are assigned to the student (up to 2 per station)

### Student status updates to "Active Therapy" (when IUP is finalized)

### Goals appear in SCR-002 (Today's Session Dashboard) for teachers

### Components & Interaction Details

| **Component**                      | **Type**                              | **Description**                                                                        | **Validation / Behavior**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Student Selector                   | Dropdown / Search                     | Select the student for whom you are creating the IUP.                                  | List shows all students with status "Ready for IUP" or "IUP Draft". Required.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| IUP Header                         | Read-only Section                     | Auto-populated student information.                                                    | \- Student Name- Age, DOB- Program/Group- Enrollment Date                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Assessment Summary (Context Panel) | Read-only Panel                       | Displays a summary of the student's 6-week assessment results to inform IUP decisions. | Includes:- Skills Assessment (ABLLS): Key strengths and areas of need (top 3 each)- Behavior Assessment: Identified behavior functions and recommendations- Preference Assessment: the system shall auto-populate the "Reinforcement Strategies" section with the student's top 5 preferences from the Preference Assessment. Teachers may select specific reinforcers from the full preference list. <br>Sensory Engagement Summary: When creating an IUP, the system shall display a summary of the student's Sensory Time Engagement Assessment results, including:Activities the student enjoyed, Activities the student refused, Engagement support levels required This data shall be available for the Program Director to reference when developing the IUP, particularly for the "Reinforcement Strategies" and "Antecedent Manipulations" sections. |
| IUP Form                           | Multi-section Form                    | The main IUP document.                                                                 | Contains editable sections:- <br>form from the admin panel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Goal Assignment Section            | Interactive Area                      | Assign goals to Station 1 and Station 2.                                               | \- Station 1 (Basic Skills): Up to 2 goals- Station 2 (Advanced Skills): Up to 2 goalsFor each slot:- Goal Selector (Search/select from Goal Bank - SCR-007)- Goal Name (auto-populated from Goal Bank)- Goal Description (auto-populated)- Mastery Criteria (pre-filled, optionally editable per student)- Notes (optional text for individualization)<br><br>Goal Type Selection: When assigning a goal from the Goal Bank, the Program Director shall be able to: <br>View the goal type (Standard or Task Analysis) <br>For Task Analysis goals, view the full step list <br>Customize the step list for the individual student (add/remove steps) <br>Set per-step mastery criteria <br>Set overall mastery criteria                                                                                                                                     |
| Add Goal Button                    | Button (within each slot)             | Opens the Goal Selector modal (SCR-007 style) to browse and select a goal.             | \- Filters by domain- Shows only goals appropriate for the student's age and group- Prevents duplicate assignment of the same goal within the IUP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Remove Goal Button                 | Button (trash icon, within each slot) | Removes the assigned goal from the slot.                                               | Confirmation: "Remove this goal from the IUP?"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Goal Details View                  | Read-only Modal                       | Click on an assigned goal to view its full details.                                    | Shows: Goal Name, Domain, Description, and any associated data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Auto-Suggest Goals                 | Button                                | System suggests goals based on the assessment data (ABLLS scores and areas of need).   | Post-MVP enhancement (currently out of scope). For MVP, this button is hidden or disabled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Draft Save                         | Button                                | Saves the IUP as a draft without finalizing.                                           | Allows the Program Director to return later. Draft status is indicated in the IUP list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Preview IUP                        | Button                                | Opens a read-only preview of the complete IUP document.                                | Shows all sections in a printable format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Finalize IUP                       | Button                                | Finalizes the IUP.                                                                     | \- Validates that at least one goal is assigned per applicable station.- Confirmation: "Finalize this IUP for \[Student Name\]? This will move the student to Active Therapy status."- Upon confirmation: Student status updates to "Active Therapy", goals become visible in SCR-002, and the IUP is archived as a permanent record.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Print/Export PDF                   | Button                                | Exports the final IUP as a PDF document.                                               | Named: \[StudentName\]\_IUP_\[Date\].pdf                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

# **_Screen ID: SCR-PD-004 - IUP Library Management_**

## Screen Information

| Field       | Value                            |
| ----------- | -------------------------------- |
| Screen ID   | SCR-PD-004                       |
| Screen Name | IUP Library Management           |
| User Role   | Program Director                 |
| Platform    | Web/Desktop (Responsive), Tablet |

### Purpose, Pre-Conditions & Post-Conditions

### Purpose: Provide the Program Director with a comprehensive view of all IUPs in the system-drafts, active, and archived. This screen enables the Program Director to: View all IUPs for all students, Filter by status (Draft, Active, Archived), Open an IUP for editing (Draft only) or viewing (Active/Archived), Track IUP creation and update history

### Pre-Conditions: User logged in as Program Director. IUPs exist in the system

### Post-Conditions: User navigates to the selected IUP for viewing or editing

### Components & Interaction Details

| **Component**    | **Type**         | **Description**                                                      | **Validation / Behavior**                                                                                                              |
| ---------------- | ---------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| IUP List         | Scrollable Table | Displays all IUPs in the system.                                     | Columns:- Student Name- Program/Group- Status (Draft, Active, Archived)- Date Created- Last Updated- Actions (View, Edit - Draft only) |
| Filter Controls  | Dropdowns        | Filter IUPs by Student, Program, Group, or Status.                   | Reduces the list to relevant items.                                                                                                    |
| Search           | Text Input       | Search IUPs by Student Name.                                         | Real-time filter.                                                                                                                      |
| View IUP         | Button           | Opens the IUP in read-only mode.                                     | Displays the complete IUP document (same format as finalized IUP). Includes all assessment data and goals.                             |
| Edit IUP         | Button           | Opens the IUP in edit mode (SCR-PD-003) for draft IUPs only.         | Only visible for IUPs with status "Draft".                                                                                             |
| Archive IUP      | Button           | Archives an IUP (typically when a student graduates or transitions). | Confirmation required. Archiving does not delete data; it moves it to a historical state.                                              |
| Print/Export PDF | Button           | Exports the IUP as a PDF document.                                   | Named: \[StudentName\]\_IUP_\[Date\].pdf                                                                                               |

# **_Screen ID: SCR-PD-005 - Student Caseload Management_**

## Screen Information

| Field       | Value                            |
| ----------- | -------------------------------- |
| Screen ID   | SCR-PD-005                       |
| Screen Name | Student Caseload Management      |
| User Role   | Program Director                 |
| Platform    | Web/Desktop (Responsive), Tablet |

### Purpose, Pre-Conditions & Post-Conditions

### Purpose: Enable the Program Director to manage goal assignments for students outside of the full IUP creation workflow. This screen extends the functionality of SCR-007 (Goal Bank & IUP Assignment)

### Pre-Conditions: User logged in as Program Director. Student exists in the system. Goal Bank exists

### Post-Conditions: Goals are assigned, updated, or removed from the student's active therapy plan

### Components & Interaction Details

| **Component**             | **Type**          | **Description**                                                                                      | **Validation / Behavior**                                                                                                                                                                                                                              |
| ------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Student Selector          | Dropdown / Search | Select the student whose goals you want to manage.                                                   | List shows all active students. Required.                                                                                                                                                                                                              |
| Current Goals View        | Section           | Displays the student's current goal assignments.                                                     | \- Station 1 (Basic Skills): Up to 2 goals- Station 2 (Advanced Skills): Up to 2 goalsFor each goal:- Goal Name (click to view details)- Status (Active, In Progress, Mastered)- Progress % (if applicable)- Remove Goal button (with confirmation)    |
| Goal Bank Browser         | Section           | The Goal Bank (SCR-007) integrated into this screen.                                                 | \- Search by goal name or keyword- Domain Filter chips (Communication, Motor, Social, Self-Help, Cognition)- Goal List: Scrollable list of goal cards. Each card shows:- Goal Name- Domain- Description (short)- Assign button (adds to selected slot) |
| Assignment Slot Selection | Interactive Area  | When a goal is selected from the Goal Bank, the Program Director chooses which slot to assign it to. | Options:- Station 1, Slot 1 (if empty)- Station 1, Slot 2 (if empty)- Station 2, Slot 1 (if empty)- Station 2, Slot 2 (if empty)- Replace Existing Goal (if all slots are full, prompt to replace one)                                                 |
| Replace Goal              | Modal             | Appears if the user attempts to assign a goal when all slots are full.                               | Shows current assigned goals. User selects which goal to replace with the new one.                                                                                                                                                                     |
| Goal Details View         | Modal             | Click on any goal (assigned or in the Goal Bank) to view full details.                               | Shows: Goal Name, Domain, Description, Date Created, Last Modified.                                                                                                                                                                                    |
| Add New Goal to Bank      | Button            | Opens a form to create a new goal in the Goal Bank.                                                  | Same as SCR-007 (Goal Bank). Requires: Goal Name, Domain, Description.                                                                                                                                                                                 |
| Save Changes              | Button            | Persists all goal assignment changes.                                                                | Validates that the student has at least one goal assigned per applicable station.                                                                                                                                                                      |
| Remove Goal               | Button            | Removes a goal from the student's active plan.                                                       | Confirmation required. The goal is not deleted from the Goal Bank, only unassigned from the student.                                                                                                                                                   |
| View Goal Progress        | Button            | For assigned goals, opens the goal progress chart (graph) for that student.                          | Navigates to SCR-PD-008 (Graph & Chart View) pre-filtered for the selected goal.                                                                                                                                                                       |

# **_Screen ID: SCR-PD-006 - Goal Bank Management_**

## Screen Information

| Field       | Value                            |
| ----------- | -------------------------------- |
| Screen ID   | SCR-PD-006                       |
| Screen Name | Goal Bank Management             |
| User Role   | Program Director                 |
| Platform    | Web/Desktop (Responsive), Tablet |

### Purpose, Pre-Conditions & Post-Conditions

### Purpose: Provide the Program Director with a dedicated interface to manage the Goal Bank. This includes adding, editing, deactivating, and organizing goals by domain. This screen extends SCR-007 (Goal Bank & IUP Assignment) with full management capabilities

### Pre-Conditions: User logged in as Program Director

### Post-Conditions: Goal Bank is updated with new goals, edits, or deactivations

### Components & Interaction Details

| **Component**     | **Type**             | **Description**                                       | **Validation / Behavior**                                                                                                                                                                                                                                         |
| ----------------- | -------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Goal List         | Scrollable Table     | Displays all goals in the Goal Bank.                  | Columns:- Goal Name- Domain (Communication, Motor, Social, Self-Help, Cognition)- Description (truncated)- Usage Count (number of students currently assigned this goal)- Status (Active, Inactive)- Actions (Edit, Delete/Deactivate)                            |
| Search            | Text Input           | Search goals by name or keyword.                      | Real-time filter.                                                                                                                                                                                                                                                 |
| Domain Filter     | Dropdown / Chips     | Filter goals by domain.                               | Options: All, Communication, Motor, Social, Self-Help, Cognition.                                                                                                                                                                                                 |
| Add New Goal      | Button               | Opens the Goal Details form in "Create" mode.         | Accessible to Program Directors only.                                                                                                                                                                                                                             |
| Goal Details Form | Modal / Inline Panel | Appears when creating or editing a goal.              | Contains:- Goal Name (Text, Required, Unique)- Domain (Dropdown, Required)- Description (Text Area, Required)- Mastery Criteria Template (Optional, used for auto-populating IUP)- Suggested Age Range (Optional, for filtering)- Status (Active/Inactive toggle) |
| Delete Goal       | Button               | Permanently deletes a goal from the Goal Bank.        | \- Confirmation required- Cannot delete a goal currently assigned to any active student- If assigned, the goal must be deactivated instead                                                                                                                        |
| Preview Goal      | Button               | Opens a read-only preview of the goal's full details. | Includes any associated data.                                                                                                                                                                                                                                     |

# **_Screen ID: SCR-PD-007 - Parent Communication (Program Director View)_**

## Screen Information

| Field       | Value                            |
| ----------- | -------------------------------- |
| Screen ID   | SCR-PD-007                       |
| Screen Name | Parent Communication             |
| User Role   | Program Director                 |
| Platform    | Web/Desktop (Responsive), Tablet |

### Purpose, Pre-Conditions & Post-Conditions

### Purpose: Provide the Program Director with a communication hub similar to SCR-DIR-004, but focused on clinical aspects such as: Sharing IUP updates with parents, Discussing assessment results, Updating parents on goal progress, Addressing parent questions about therapy plans

### Pre-Conditions: Parent accounts exist (linked to students)

### Parent has initiated a conversation, or Program Director wants to share an update

### Post-Conditions: Messages are sent and tracked. Communication history is preserved

### Components & Interaction Details

| **Component**           | **Type**                     | **Description**                                                                                      | **Validation / Behavior**                                                                                                                                                                                                                         |
| ----------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conversation List       | Scrollable List              | Displays all active conversations with parents for students the Program Director is responsible for. | Each item shows:- Student Name- Parent Name- Last Message Preview- Timestamp- Unread Badge (if new message from parent)Click to open the conversation.                                                                                            |
| Filter Controls         | Dropdowns                    | Filter conversations by Student or Date Range.                                                       | Reduces the list to relevant items.                                                                                                                                                                                                               |
| Search                  | Text Input                   | Search conversations by Student Name, Parent Name, or Message Content.                               | Real-time filter.                                                                                                                                                                                                                                 |
| Conversation View       | Chat-Like Interface          | Opens when a conversation is selected.                                                               | Shows:- Header: Student photo, Name, Parent Name- Message Thread: Chronological list of all messages- Message Input: Text area + Send button- Share Updates Button: Quick action to share IUP updates, assessment summaries, or progress reports. |
| Share Assessment Report | Button (within conversation) | Attaches the Assessment Summary Report (SCR-015) to the conversation.                                | \- Opens a preview of the report- Program Director can add a message explaining the report- Sends the report as a PDF attachment                                                                                                                  |
| Share IUP               | Button (within conversation) | Attaches the finalized IUP to the conversation.                                                      | \- Opens a preview of the IUP- Program Director can add a message explaining the plan- Sends the IUP as a PDF attachment                                                                                                                          |
| Share Progress Update   | Button (within conversation) | Shares a goal progress chart (SCR-PD-008) with the parent.                                           | \- Allows the Program Director to select a specific goal and date range- Generates a visual chart and includes it in the message                                                                                                                  |
| Escalate to Director    | Button                       | Flags a conversation for Director attention.                                                         | Creates a notification in the Director's dashboard (SCR-DIR-001).                                                                                                                                                                                 |
| Communication Log       | Button / Tab                 | View a historical summary of all communications for this student.                                    | Useful for audits and continuity.                                                                                                                                                                                                                 |

# **_Screen ID: SCR-PD-008 - Graph & Chart View_**

## Screen Information

| Field       | Value                            |
| ----------- | -------------------------------- |
| Screen ID   | SCR-PD-008                       |
| Screen Name | Graph & Chart View               |
| User Role   | Program Director                 |
| Platform    | Web/Desktop (Responsive), Tablet |

### Purpose, Pre-Conditions & Post-Conditions

### Purpose: Enable the Program Director to generate and view visual data representations (graphs and charts) for students. This supports clinical decision-making by visualizing progress, trends, and patterns over time

### Pre-Conditions

### User logged in as Program Director

### Student data exists (session logs, trial data, assessments)

### Post-Conditions: Charts and graphs are generated and viewable/exportable

### Components & Interaction Details

| **Component**                     | **Type**              | **Description**                                                    | **Validation / Behavior**                                                                                                                                                                                                                                                                                                                  |
| --------------------------------- | --------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Student Selector                  | Dropdown / Search     | Select the student whose data you want to visualize.               | List shows all active students. Required.                                                                                                                                                                                                                                                                                                  |
| Chart Type Selector               | Tabs / Dropdown       | Select the type of chart to generate.                              | Options:- Goal Progress (Line Chart): Shows independence percentage over time for selected goals- Trial Distribution (Bar Chart): Shows breakdown of prompts used (FP, PP, G, +)- Behavior Incident Trends (Bar/Line Chart): Shows frequency of behavior types over time- Assessment Summary (Radar Chart): Visualizes ABLLS domain scores |
| Goal Selector (for Goal Progress) | Multi-Select Dropdown | Select one or more goals to display on the chart.                  | Shows all goals (active and mastered) for the selected student.                                                                                                                                                                                                                                                                            |
| Date Range Selector               | Date Picker           | Select the date range for the data.                                | Default: Last 30 daysOptions: Last 7 days, Last 30 days, Last 90 days, Custom range                                                                                                                                                                                                                                                        |
| Chart Rendering                   | Chart Area            | Displays the selected chart type with the selected data.           | \- Interactive (hover/click for data points)- Responsive (scales to screen size)- Auto-refreshes when filters change                                                                                                                                                                                                                       |
| Export Chart                      | Button                | Exports the chart as an image (PNG) or PDF.                        | Named: \[StudentName\]\_\[ChartType\]\_\[DateRange\].png                                                                                                                                                                                                                                                                                   |
| Share Chart                       | Button                | Shares the chart via the Parent Communication module (SCR-PD-007). | Links to SCR-PD-007, pre-populating with the chart attachment.                                                                                                                                                                                                                                                                             |
| Print Chart                       | Button                | Prints the chart for documentation.                                | Opens print dialog.                                                                                                                                                                                                                                                                                                                        |