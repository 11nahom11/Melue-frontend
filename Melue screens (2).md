**Screen Name Login**

**Screen ID SCR-001**

**User Roles Teacher / Therapist, Therapy Coordinator, Program Director, Director, Institutional Administrator, System Administrator**

**Purpose**

Authenticate a registered staff member and route them to the appropriate starting view based on their role and assigned session.

**Component Details**

- Melue Foundation Logo
- "Sign In to Your Account"
- Email Address Field Required. Must be valid email format.
- Password Field
- Remember this device
- Sign In Button
- Forgot Password?

**Screen Name Today's Session Dashboard**

**Screen ID SCR-002**

**User Role Teacher / Therapist (Primary)**

**Purpose**

- View the two students assigned to their current station/session block.
- Toggle between two active goals per student (as defined in the IUP).
- Log unlimited trial-by-trial data using the prompt hierarchy (FP, PP, G, +).
- Monitor session timer and remaining time in the current station block.
- Seamlessly switch focus between Student A and Student B.

**Component Detail**

- Station & Room Header - Displays current station name and room (e.g., "Station 1: Basic Skills - Room 2").
- Timer - Countdown timer showing time remaining in the current 1h30m or 1h20m therapy block.
- Teacher Name - Logged-in teacher's display name.
- Student Card (Left Column) Active student view. All interactions target this student's active goal. See below.
- Student Card (Right Column) Secondary student view. Used for quick data entry without full context switch. Tapping anywhere on this card's prompt bar swaps it to Active (Left).
- Student Name Visual identifier for student. Tapping shows full student profile (read-only).
- Goal Selector Below Student Name Two tabs/pills representing the two goals assigned for this station. Tapping switches the Active Goal for that student column.
- Trial Stream (Last 5) Below Goal Pills Horizontal row of icons showing the prompt level used for the last 5 trials of the active goal. Informational only. Icons: + (Independent) = Green, G = Yellow, PP = Orange, FP = Red.
- Prompt Entry Bar Four large buttons: FP, PP, G, +. Tapping logs a trial instantly for the Active Goal of the student in that column.
- Record Behavior Incident - Below Prompt Bar Secondary button with warning icon. Opens the Behavior Incident Modal (SCR-003).
- Swap Button - Button to explicitly move the secondary student to Active column.
- End Session Button - Primary action to finish the session block. Navigates to Session Summary Screen (SCR-005).

| Component                 | Type            | Description                          | Validation/Behavior                                                               |
| ------------------------- | --------------- | ------------------------------------ | --------------------------------------------------------------------------------- |
| **Goal Type Indicator**   | Badge           | Shows "Standard" or "Task Analysis"  | Auto-detected from goal configuration                                             |
| **Step List**             | Scrollable List | Displays all steps in the task chain | Shows step number, description, progress bar, prompt buttons, success/fail toggle |
| **Step Progress Bar**     | Visual          | Shows independence % per step        | Auto-calculated from trial data                                                   |
| **Step Prompt Buttons**   | Buttons         | FP, PP, G, + per step                | Tapping logs a trial for that specific step                                       |
| **Step Success/Fail**     | Buttons         | ✓ (Success) or ✗ (Fail)              | Required for each trial                                                           |
| **Active Step Indicator** | Highlight       | Shows which step is being worked on  | Teacher can tap to select active step                                             |
| **Overall Progress**      | Section         | Shows percentage of mastered steps   | Auto-calculated                                                                   |
| **Mastered Steps**        | Read-only       | Lists mastered steps                 | Auto-populated                                                                    |
| **Remaining Steps**       | Read-only       | Lists steps not yet mastered         | Auto-populated                                                                    |

**Screen Name Behavior Incident Modal**

**Screen ID SCR-003**

**User Role Teacher / Therapist**

**Purpose**

- Document behaviors using the ABC (Antecedent-Behavior-Consequence) model.
- Capture contextual notes without leaving the main session dashboard.

**Component Details**

- Header Displays student name, current goal, and close (X) button.
- Date Auto-populates to today, can be changed
- Time Auto-populates to current time, can be changed
- Location Options: Therapy Room, Snack Place, Playground, Sensory Room, Circle Time, Other. Configurable via SCR-ADMIN-003
- Behavior name Options: Unable to remain seated, Biting others, Flopping, Screaming, Other. Configurable via SCR-ADMIN-003
- Behavior definition Auto-populates when behavior is selected
- Frequency Options: Rarely, Occasionally, Frequently, Very Frequently, Constantly
- Intensity Options: Mild, Moderate, Severe
- Category Options: Attention-seeking, Safety concerns, Not sitting still/Hyperactivity, Making noises/interrupting conversation, Running away/climbing furniture/eating inedible items, Flopping, Elopement, Difficulty with transitions, Obsessive, Inappropriate
- Antecedent Dropdown options configurable via SCR-ADMIN-003. "Other" option opens text input
- Consequence Dropdown options configurable via SCR-ADMIN-003. "Other" option opens text input
- Additional Notes -Text Area Free text for any extra observations Optional.
- Cancel Button Dismisses modal without saving. Confirmation dialog if any field has been touched.
- Save Incident Button - Persists the incident record locally and closes modal.
- Recorded by Auto-populated from logged-in user

> **Note:** SCR-003 is the in-session incident capture modal. ABC incident logging is also available from the Behavior Assessment (SCR-013 / SCR-TEA-003), which links to this modal for incident entry.

**SCR-003A: ABC Data Sheet View**

**Screen ID: SCR-003A**

**Screen Name: ABC Data Sheet View**

User Role: Teacher / Therapist, Therapy Coordinator, Program Director

Platform: Tablet (Landscape), Web

Purpose: Display a tabular view of all ABC incidents for a student, mirroring the physical ABC Data Sheet format. Used for review, analysis, and reporting.

Pre-Conditions:

ABC incident data exists for the student

User has access to view student data

Post-Conditions:

Data is displayed, filterable, and exportable

Component Details:

| Component         | Type         | Description                       | Validation/Behavior                                                                                       |
| ----------------- | ------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Student Header    | Read-only    | Student photo, name, age          | Auto-populated                                                                                            |
| Date Range Filter | Date Pickers | Filter incidents by date range    | Default: Last 30 days                                                                                     |
| Behavior Filter   | Dropdown     | Filter by behavior type           | Options: All, Elopement, Biting, Flopping, Screaming, etc.                                                |
| Category Filter   | Dropdown     | Filter by category                | Options: All, Attention-seeking, Safety, etc.                                                             |
| Export Button     | Button       | Export data                       | CSV or PDF format                                                                                         |
| ABC Data Table    | Table        | Displays all incidents in a table | Columns: Date, Time, Location, Behavior, Frequency, Intensity, Category, Antecedent, Consequence, Teacher |
| Row Click         | Click        | Click a row to view full details  | Opens SCR-003 in read-only mode                                                                           |
| View Details      | Button       | View incident details             | Opens SCR-003 in read-only mode                                                                           |
| Delete Incident   | Button       | Delete an incident                | Confirmation required. System Admin only                                                                  |

**Screen Name Goal Mastery Check Screen**

**Screen ID SCR-004**

**User Role Teacher / Therapist (Primary), with optional inputs from two additional teachers (Teacher B and Teacher C)**

**Purpose**

- Documenting the outcome of the Two-Teacher Generalization Check required after a student achieves 100% independence with the primary teacher.
- Capturing verification results from Teacher B and Teacher C in a single consolidated view.
- Recording whether the skill persists with novel people.
- Automatically flagging the goal for Program Director review upon successful checks, or keeping the goal active if generalization fails.

**Component Details**

- Back Button -Returns to the previous screen (Session Dashboard or Student Profile).
- Student & Goal Header - Displays student photo, full name, goal name, and station. Auto-populated from triggering context.
- Primary Teacher Data Card -Summarizes the mastery criteria achieved by Teacher A.
- Teacher B Section - Input section for the second teacher's verification. Teacher B name auto-filled from staff list (assigned to this student/group).
- Teacher C Section - Input section for the third teacher's verification. Teacher C name auto-filled.
- Verification Outcome - Options for each teacher's observation. Success or fail
- Prompt Used Dropdown - Visible only when "Failed - Required Prompt" is selected. Options: FP, PP, G.
- Notes Fields Free text for each teacher to add context.
- Cancel Button - Discards any entered data and navigates back. Confirmation dialog if changes made.
- Submit for Review Button: Saves the check results and changes the goal status to "Pending Approval". Routes the goal to the Program Director for final approval. Enabled only when both Teacher B and Teacher C have selected an outcome.
- Verification Status Indicator: Displays the current status of the mastery check:
  - "Verification Pending" (waiting for Teacher B/C)
  - "Verification Complete - Pending Approval" (both teachers verified, waiting for Program Director)
  - "Approved - Goal Mastered" (finalized)
  - "Rejected - Action Required" (returned to Teacher A with feedback)

**Screen Name Session Summary Screen**

**Screen ID SCR-005**

**User Role Teacher / Therapist**

**Purpose**

- Review a complete summary of the therapy session for both students.
- See auto-calculated metrics: trials per goal, independence percentages, behavior incidents logged.
- Add qualitative observations (the only manual text entry required).
- Submit the session report to the Program Coordinator and end the session block.

**Component Details**

- Back to Session - Returns to Dashboard (SCR-002) without ending session. Confirmation if notes entered.
- Preview PDF Opens a read-only PDF view of the report exactly as it will appear to the Program Director.
- Session Details Card- Station, teacher name, exact start/end times, total duration.
- Student A/B Cards - Expandable/collapsible sections. Tapping header toggles expansion.
- Goal Summary Row-Displays goal name, total trials, breakdown by prompt level, and independence percentage. Calculated from trial logs.
- View Trial Log Link-Opens a modal with chronological list of all trials for that goal (time, prompt).
- Task Analysis Summary: For Task Analysis goals, the session summary shall display:
  - Full step list with per-step progress
  - Trials logged per step
  - Success/fail count per step
  - Independence percentage per step
  - Overall mastery status
- Behavior Incidents List - Condensed list showing time and type. - Aggregated from SCR-003 entries.
- View Full Incident Details - Opens a modal with ABC data for each incident.
- Incident count - Shows count next to the section header
- Teacher Qualitative Notes-Multi-line text input. Placeholder text guides the teacher.
- Save Draft Button -Saves current state (including notes) without ending session officially.
- Submit & End Session Button - Finalizes the session, marks it as complete, and sends report to Coordinator. Disabled if qualitative notes are empty (unless made optional)**.**

**Screen Name Student Register & Profile/Placement**

**Screen ID SCR-006**

**User Role Program Director, Therapy Coordinator**

**Purpose**

- View a searchable, filterable list of all enrolled students.
- Add new students
- Edit student profile information
- Assign program placement (Regular vs. Pooled Out) and therapy group (Basic Therapy vs. Functional Living Skills).

**Component Details**

- Search Bar - Filters student list in real-time by name.
- Program Filter - Drop down - Regular, Pooled Out. Single-select; updates list. Default: All
- Group Filter - Drop down - Basic Therapy, Functional Living. Single-select; updates list. Default: All
- Add New Student Button - Primary action to create a new student record.
- Student List - Scroll-able list of student rows. Each row displays: Student name, age, Program / Group. Clicking a row selects it and loads its full profile in the right pane.

This part appears when a student is selected from the list or when "Add New Student" is tapped.

- Core Info - Full Name - Text input - Required.
- Date of Birth - Date picker - Required. Age auto-calculated and displayed.
- Parent/Guardian Name - Text input - Required.
- Contact Phone - Tel input - Required. Format validation.
- Placement - Program Type - Radio group - Required: Regular or Pooled Out.
- Therapy Group - Radio group - Required: Basic Therapy (3-12) or Functional Living (13-19). System validates age against group range; if mismatch, show warning icon.
- Station Assignment - Drop-down with station options(station 1 or 2).

Actions

- Cancel Button - Discards changes and reverts to previously saved state. Confirmation if unsaved changes.
- Save Button - Validates and persists data. Disabled if required fields missing.

**Screen Name Student Profile Screen**

**Screen ID SCR-006A**

**User Role Teacher, Therapist, Therapy Coordinator, Program Director**

**Purpose**

- View a student's full profile details in a dedicated screen.
- Provide read-only access for Teachers/Therapists and editable access for Coordinators/Directors.
- Serve as the central hub for viewing student information, placement, and assigned goals.

Triggered From

SCR-002 - Tapping student name

SCR-006 - Selecting a student from the list

**Component Details**

Back Button - Returns to the previous screen (Session Dashboard or Student Register).

Student Header - Displays student photo (if available), full name, and age.

Media Section:

- Headshot Photo: \[Display photo\] (Required)
- Baseline Video: \[Play button\] \[Upload/Replace\] (Optional)

Core Information Section

- Full Name
- Date of Birth (Age auto-calculated)
- Parent/Guardian Name
- Contact Phone

Placement Information

- Program Type (Regular / Pooled Out)
- Therapy Group (Basic Therapy / Functional Living Skills)
- Station Assignment
- Current Goals Summary

Displays assigned goals per station:

- Station 1 (Basic Skills) - up to two goals
- Station 2 (Advanced Skills) - up to two goals

Read-only summary.

Edit Button - Visible only to Therapy Coordinator and Program Director.

Navigates to Create/Edit Student Screen (SCR-006B) in Edit Mode.

**Screen Name Create / Edit Student Screen**

**Screen ID SCR-006B**

**User Role Program Director, Therapy Coordinator**

**Purpose**

- Create a new student record or edit an existing student profile.
- Ensure all required student, placement, and contact data is captured and validated.

Triggered From

SCR-006 → Add New Student Button (Create Mode)

SCR-006A → Edit Button (Edit Mode)

Modes

Create Mode

- All fields empty
- Creates new student record

Edit Mode

- Fields pre-filled with existing student data
- Updates existing record

**Component Details**

Back / Cancel Button- Returns to previous screen. Shows confirmation dialog if unsaved changes exist.

Form Fields

- Full Name Text input - Required
- Date of Birth Date picker - Required Age auto-calculated and displayed
- Parent/Guardian Name Text input - Required
- Contact Phone Tel input - Required Format validation applied

Placement Section

- Program Type Radio group - Required Options: Regular, Pooled Out
- Therapy Group Radio group - Required Options: Basic Therapy (3-12), Functional Living Skills (13-19). System validates age against selected group. Displays warning if mismatch.
- Station Assignment Dropdown (Station 1 or Station 2)

Actions

- Save Button Validates all required fields and persists data. Disabled if validation fails.
- Cancel Button Discards changes.Confirmation dialog if changes were made.

**Screen Name Goal Bank & IUP Assignment**

**Screen ID SCR-007**

**User Role Program Director, Therapy Coordinator**

**Purpose**

- View and manage a library of standard ABA goals organized by domain (e.g., Communication, Social, Motor, Self-Help).
- Add, edit, goals
- Assign up to two goals per station to individual students .
- View a student's current goal assignments across stations at a glance.

**Component details**

- Student Search - Text input to filter student list by name. Real-time filter.
- Group Filter - All, Basic Therapy, Functional Living.
- Student List Scrollable showing name, age, program/group.Tapping selects student; loads their IUP summary below and enables assignment.
- Current IUP Summary - Displays for selected student: Station 1 (Basic Skills) with two goal slots, Station 2 (Advanced Skills) with two goal slots. Each slot shows goal name or "Not assigned". Read-only overview.

Goal Library Browser

- Goal Search - Search by goal name or keyword.Filters goal list.
- Domain Filter Chips - Horizontally scrollable chips: All, Communication, Motor, Social, Self-Help, Cognition.
- Goal List - Scrollable list of goal cards. Each card shows: Goal name, Domain. A checkbox indicates if goal is already assigned to selected student (in any station). Tapping a goal selects it and loads details.
- Add New Goal Button - Button at bottom of list. Opens "Create New Goal" form.

Goal Details & Assignment

- View/Assign Goal (when a goal is selected) or Create New Goal (when Add New is tapped).

View/Assign Existing Goal

- Goal Details - Goal Name, (editable via Edit button for Director).
- Domain - Dropdown (Communication, Motor, Social, Self-Help, Cognition).
- Description - Multi-line text describing the target behavior.
- Assignment Section - Station - Station 1 (Basic Skills) or Station 2 (Advanced Skills). Only stations applicable to student's group appear.
- Assign Goal Button

Create New Goal

- Goal Name - Text input
- Domain - Dropdown.
- Description - Multi-line text
- Save Goal Button - Creates goal and adds to library.

**Screen Name Staff Management & Teacher-Student Linking**

**Screen ID SCR-008**

**User Role Program Director, Therapy Coordinator**

**Purpose**

- View and manage staff accounts (Teachers, Coordinators, Directors).
- Add new staff with role, contact information, and login credentials.
- Edit or deactivate staff accounts.
- Link teachers to students for specific session blocks (station, day, time).
- View teacher schedules and assigned student lists at a glance.

**Component Details**

- Search Bar - Filter staff by name or email.
- Role Filter Chips - All, Teacher, Coordinator, Director. Default: All.
- Add Staff Button - Primary action to open blank staff form.
- Staff List - Scrollable table showing name, role, status (Active/Inactive). Tapping selects staff member; loads details

Staff Details & Account

- Full Name
- Email - Required, unique. Used for login.
- Phone - Tel input
- Role - Dropdown Teacher, Coordinator, Director.
- Account Status - Active / Inactive. Inactive prevents login.
- Save Changes Button Persists all edits. Disabled if no changes or validation fails.
- Reset Password Button-Sends password reset email
- Deactivate / Activate Button- Toggles account status with confirmation.

Teacher-Student Linking

This section is only visible when the selected staff member has the role "Teacher" .

- Station Selector - Dropdown listing all stations (e.g., Station 1 Basic Skills, Station 2 Advanced Skills).
- Day/Block Selector - Dropdown listing available session blocks for selected station. Format: "Monday AM (8:07-12:00)", "Monday PM (1:10-4:45)", "Tuesday AM", etc. Required.
- Available Students List - Multi-select list of students who are: (a) enrolled in the selected station's therapy group, (b) not already assigned to another teacher in this exact block, (c) not exceeding 2 students per teacher limit. Checkboxes for selection.
- Assigned Students List - Shows students currently assigned to this teacher for the selected station/block.
- Assign Button - Moves selected Available Students to Assigned list.Validates teacher capacity (max 2 per block).
- Remove Button - Moves selected Assigned Students back to Available list. Confirmation if student has session data already logged.
- Current Assignments Summary - Table showing all blocks and assigned students for this teacher.

> **Note:** Teacher-Student linking is also provided from the Director module as **SCR-DIR-002** (Staff Scheduling) and from System Administration as part of **SCR-SYS-001** (Staff Account Management). This screen (SCR-008) is the Program Director / Therapy Coordinator view of the same data.