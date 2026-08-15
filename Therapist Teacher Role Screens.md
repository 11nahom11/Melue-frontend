# **Therapist / Teacher Role Screen Specifications**

# **_Screen ID: SCR-TEA-001 - Teacher Dashboard_**

| Field       | Value                             |
| ----------- | --------------------------------- |
| Screen ID   | SCR-TEA-001                       |
| Screen Name | Teacher Dashboard                 |
| User Role   | Teacher / Therapist               |
| Platform    | Tablet (Landscape), Web (Desktop) |

## Purpose, Pre-Conditions & Post-Conditions

### Purpose

Provide the teacher with a centralized view of their daily responsibilities, including active sessions, pending assessments, pending mastery checks, and notifications. This dashboard serves as the entry point for all teacher activities.

### Pre-Conditions

User logged in as Teacher.

### Post-Conditions

User navigates to the appropriate screen (Session Dashboard, Assessment, Mastery Check, etc.).

## Components & Interaction Details

| Component                   | Type            | Description                                        | Validation / Behavior                                                                |
| --------------------------- | --------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Header                      | Text            | "Good Morning, \[Teacher Name\]"                   | Personalized.                                                                        |
| Date/Time                   | Read-only       | Current date and time.                             | Auto-updates.                                                                        |
| Today's Schedule Card       | Card            | Displays the teacher's current session assignment. | Shows Station & Room, Session Block, Assigned Students, Timer, Start Session button. |
| Assessment Tasks Card       | Card            | Shows students assigned for 6-week assessments.    | Shows student list and Continue Assessment button.                                   |
| Pending Mastery Checks Card | Card            | Shows goals pending mastery verification.          | Shows goals ready for mastery checks.                                                |
| Notifications               | Scrollable List | Recent notifications.                              | Session approvals, revision requests, coordinator alerts, parent messages.           |
| Quick Action Buttons        | Buttons         | Direct links to common tasks.                      | Start Session, Assessments, Mastery Checks, Parent Communication.                    |

# **_Screen ID: SCR-TEA-002 - Skills Assessment (ABLLS-R Logging)_**

| Field       | Value                     |
| ----------- | ------------------------- |
| Screen ID   | SCR-TEA-002               |
| Screen Name | Skills Assessment (ABLLS-R) |
| User Role   | Teacher / Therapist       |
| Platform    | Tablet (Landscape)        |

> **Note:** This screen is also specified as **SCR-011** ("ABLLS-R Skills Assessment") in `Screens Set 2.md`. Both IDs refer to the same screen; this spec adds the full domain-by-domain component detail.

## Purpose, Pre-Conditions & Post-Conditions

### Purpose

Enable teachers to log ABLLS-R assessment data for students during the 6-week assessment period.

### Pre-Conditions

- Student is in the "In Assessment" status.
- Teacher has accessed the assessment from SCR-010.  
  ABLLS-R form is pre-loaded with default items

### Post-Conditions

ABLLS-R data is saved and the student's assessment progress is updated. Needs analysis auto generated.

## Components & Interaction Details

| **Component**     | **Type**        | **Description**                                | **Validation / Behavior**                                                                                                                              |
| ----------------- | --------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Student Header    | Read-only       | Student photo, name, age, assessment status    | Auto-populated                                                                                                                                         |
| Domain Tabs       | Tabs            | Navigate between ABLLS-R domains               | Domains: Visual Performance, Motor Imitation, Vocal Imitation, Receptive Language, Requesting, Play and Leisure, Social Interaction, Writing, Dressing |
| Color Key         | Legend          | Always visible scoring guide                   | 0 = Red (Not Demonstrated), 1 = Yellow (Emerging), 2 = Green (Mastered), N/A = Grey                                                                    |
| Progress Bar      | Visual          | Shows completion percentage for current domain | Auto-calculated from scored items                                                                                                                      |
| Skill Items List  | Scrollable Grid | Displays all skill items for selected domain   | Each row shows: Item ID (e.g., B1), Description, Score buttons, Notes field                                                                            |
| Item ID           | Label           | Unique skill identifier                        | Matches physical ABLLS-R form (B1, B2, C1, etc.)                                                                                                       |
| Skill Description | Text            | Full description of the skill                  | Matches physical ABLLS-R form                                                                                                                          |
| Score Buttons     | Radio Group     | Scoring options for each skill                 | Options: 0 (Red), 1 (Yellow), 2 (Green), N/A (Grey)                                                                                                    |
| Notes Field       | Text Input      | Optional notes for each skill                  | Free text, auto-saves                                                                                                                                  |

SCR-TEA-002A: ABLLS Need Analysis Map

Screen ID: SCR-TEA-002A

Screen Name: ABLLS Need Analysis Map

User Role: Teacher / Therapist, Program Director

Platform: Tablet (Landscape), Web

Purpose: Display a visual representation of ABLLS scores showing areas of strength and areas of need, identical to the physical "Color Need Analysis" map.

Pre-Conditions:

ABLLS assessment data exists for the student

Post-Conditions:

Visual map is displayed and exportable

Component Details:

| Component                  | Type      | Description                       | Validation/Behavior                                     |
| -------------------------- | --------- | --------------------------------- | ------------------------------------------------------- |
| Student Header             | Read-only | Student photo, name, age          | Auto-populated                                          |
| Visual Performance Section | Grid      | Visual Performance domain results | Color-coded: Red (0), Yellow (1), Green (2), Grey (N/A) |
| Motor Imitation Section    | Grid      | Motor Imitation domain results    | Same color coding                                       |
| Vocal Imitation Section    | Grid      | Vocal Imitation domain results    | Same color coding                                       |
| Receptive Language Section | Grid      | Receptive Language domain results | Same color coding                                       |
| Requesting Section         | Grid      | Requesting domain results         | Same color coding                                       |
| Play and Leisure Section   | Grid      | Play and Leisure domain results   | Same color coding                                       |
| Social Interaction Section | Grid      | Social Interaction domain results | Same color coding                                       |
| Writing Section            | Grid      | Writing domain results            | Same color coding                                       |
| Dressing Section           | Grid      | Dressing domain results           | Same color coding                                       |
| Summary Legend             | Legend    | Score interpretation              | Shows count of 0s, 1s, 2s per domain                    |
| Priority Areas             | List      | Highlights top 3 areas of need    | Domains with most 0s and 1s                             |
| Export Map                 | Button    | Exports as image or PDF           | PNG or PDF format                                       |
| Print                      | Button    | Prints the map                    | Standard print dialog                                   |

# **_Screen ID: SCR-TEA-003 - Behavior Assessment (MASS/FAST + ABC Tracking)_**

| Field       | Value               |
| ----------- | ------------------- |
| Screen ID   | SCR-TEA-003         |
| Screen Name | Behavior Assessment |
| User Role   | Teacher / Therapist |
| Platform    | Tablet (Landscape)  |

> **Note:** This screen is also specified as **SCR-013** ("MASS / FAST Questionnaire") in `Screens Set 2.md`. Both IDs refer to the same screen; this spec adds the MASS/FAST/ABC tab detail.

## Purpose, Pre-Conditions & Post-Conditions

### Purpose

Enable teachers to conduct behavior assessments using MASS and FAST questionnaires and track behavior incidents using ABC methodology.

### Pre-Conditions

- Student is in the "In Assessment" status.
- Teacher has accessed the assessment from SCR-010.

### Post-Conditions

Behavior assessment data is saved and available for Program Director review.

## Components & Interaction Details

| Component            | Type        | Description                                | Validation / Behavior                             |
| -------------------- | ----------- | ------------------------------------------ | ------------------------------------------------- |
| Student Header       | Read-only   | Student information and assessment status. | Auto-populated.                                   |
| Assessment Type Tabs | Tabs        | Switch between assessment types.           | MASS, FAST, ABC Tracking.                         |
| MASS Questionnaire   | Form        | Motivation Assessment Scale questions.     | Likert scale scoring with automatic calculations. |
| FAST Questionnaire   | Form        | Functional Analysis Screening Tool.        | Yes/No questions with automatic scoring.          |
| ABC Tracking Log     | List + Form | Record ABC incidents.                      | Add, edit, delete incidents.                      |
| Assessment Summary   | Read-only   | Summary of findings.                       | Identified functions and recommendations.         |
| Save Draft           | Button      | Saves progress.                            | Allows continuation later.                        |
| Submit Assessment    | Button      | Submits completed assessment.              | Validation and confirmation required.             |

# **_Screen ID: SCR-TEA-004 - Daily Notes & Summaries_**

| Field       | Value                             |
| ----------- | --------------------------------- |
| Screen ID   | SCR-TEA-004                       |
| Screen Name | Daily Notes & Summaries           |
| User Role   | Teacher / Therapist               |
| Platform    | Tablet (Landscape), Web (Desktop) |

## Purpose, Pre-Conditions & Post-Conditions

### Purpose

Provide teachers with a historical view of submitted session summaries and daily notes.

### Pre-Conditions

User logged in as Teacher.

### Post-Conditions

Teacher can view and access past session summaries.

## Components & Interaction Details

| Component            | Type                     | Description                    | Validation / Behavior                                             |
| -------------------- | ------------------------ | ------------------------------ | ----------------------------------------------------------------- |
| Session Summary List | Scrollable Table         | Displays all teacher sessions. | Date, Students, Station, Status, Actions.                         |
| Filter Controls      | Dropdowns / Date Pickers | Filter session list.           | By Date, Student, Status.                                         |
| Search               | Text Input               | Search by Student Name.        | Real-time filtering.                                              |
| View Session         | Button                   | Opens session summary.         | Read-only or edit mode depending on status.                       |
| Edit Draft           | Button                   | Edit draft summaries.          | Visible only for drafts.                                          |
| Resubmit             | Button                   | Resubmit revised summaries.    | Available for revision-required sessions.                         |
| View Feedback        | Button                   | View Coordinator feedback.     | Modal display.                                                    |
| Weekly Summary       | Section                  | Weekly performance summary.    | Exportable PDF.                                                   |
| Performance Metrics  | Section                  | Teacher KPIs.                  | Sessions completed, trials logged, independence %, review status. |

# **_Screen ID: SCR-TEA-005 - Parent Communication (Teacher View)_**

| Field       | Value                             |
| ----------- | --------------------------------- |
| Screen ID   | SCR-TEA-005                       |
| Screen Name | Parent Communication              |
| User Role   | Teacher / Therapist               |
| Platform    | Tablet (Landscape), Web (Desktop) |

## Purpose, Pre-Conditions & Post-Conditions

### Purpose

Enable teachers to communicate directly with parents of assigned students.

### Pre-Conditions

- Parent accounts exist.
- Teacher is assigned to the student.

### Post-Conditions

Messages are sent and tracked. Communication history is preserved.

## Components & Interaction Details

| Component                        | Type            | Description                            | Validation / Behavior                             |
| -------------------------------- | --------------- | -------------------------------------- | ------------------------------------------------- |
| Conversation List                | Scrollable List | Active conversations with parents.     | Displays student, parent and message information. |
| Filter Controls                  | Dropdowns       | Filter conversations.                  | By student.                                       |
| Search                           | Text Input      | Search conversations.                  | Real-time filtering.                              |
| Conversation View                | Chat Interface  | Parent-teacher messaging.              | Thread, input, attachments and quick actions.     |
| Share Session Summary            | Button          | Share latest approved session summary. | PDF attachment.                                   |
| Share Progress Update            | Button          | Share goal progress chart.             | Select goal and date range.                       |
| Request Home Observation         | Button          | Request observations from parent.      | Sends standardized request.                       |
| View Home Observation            | Button          | View parent observations.              | Observation history display.                      |
| Escalate to Coordinator/Director | Button          | Escalate communication.                | Creates notification for leadership roles.        |
| Communication Log                | Button / Tab    | Historical communication summary.      | Audit trail.                                      |
| Mark as Resolved                 | Button          | Close conversation.                    | Parent can reopen if needed.                      |

> **Note:** Parent Communication is provided per role: **SCR-TEA-005** (Teacher), **SCR-TC-006** (Therapy Coordinator), **SCR-PD-007** (Program Director), **SCR-DIR-004** (Director) and **SCR-PAR-004** (Parent). The shared structure is the same; each role sees a role-appropriate subset of the messaging, escalation, and sharing actions.

#

# Existing Therapy Workflow Screens Used by Teachers

The Teacher/Therapist role also utilizes the following previously defined screens:

| Screen ID | Screen Name                 | Purpose                    |
| --------- | --------------------------- | -------------------------- |
| SCR-002   | Today's Session Dashboard   | Real-time trial logging    |
| SCR-003   | Behavior Incident Modal     | ABC incident logging       |
| SCR-004   | Goal Mastery Check          | Teacher B/C verification   |
| SCR-005   | Session Summary             | Session summary generation |
| SCR-010   | 6-Week Assessment Dashboard | Assessment launcher        |
| SCR-011   | ABLLS-R Skills Assessment   | Skills assessment (same as SCR-TEA-002) |
| SCR-012   | Preference Assessment       | Preference logging         |
| SCR-012A  | Sensory Time Engagement     | Sensory engagement logging |
| SCR-013   | MASS / FAST Questionnaire   | Behavior questionnaires (same as SCR-TEA-003) |
| SCR-TEA-002A | ABLLS Need Analysis Map  | Color-coded needs map      |