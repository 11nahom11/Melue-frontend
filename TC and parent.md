# Therapy Coordinator - Screen Specifications

## _Screen ID: SCR-TC-001 - Therapy Coordinator Dashboard_

| **Field**       | **Value**                          |
| --------------- | ---------------------------------- |
| **Screen ID**   | SCR-TC-001                         |
| **Screen Name** | Therapy Coordinator Dashboard      |
| **User Role**   | Therapy Coordinator                |
| **Platform**    | Web / Desktop (responsive), Tablet |

## Purpose, Pre-Conditions & Post-Conditions

**Purpose**: Provide the Therapy Coordinator with a centralized dashboard that aggregates all operational data for the foundation. The dashboard enables real-time supervision of active sessions, visibility into pending reviews, and quick access to daily operational tasks.

**Pre-Conditions**: User logged in as Therapy Coordinator.  
**Post-Conditions**: User navigates to the desired sub-screen (Live Session Monitoring, Session Review, Student Progress, etc.).

## Components & Interaction Details

| **Component**             | **Type**            | **Description**                                        | **Validation / Behavior**                                                                                                                                                                                            |
| ------------------------- | ------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header                    | Text                | "Therapy Coordinator Dashboard"                        | Static.                                                                                                                                                                                                              |
| Date/Time                 | Read-only           | Current date and time.                                 | Auto-updates.                                                                                                                                                                                                        |
| Quick Stats Cards         | Cards (Grid)        | Display key operational metrics.                       | Each card shows a number and label, with a link to the relevant screen. - Active Sessions Now → SCR-TC-002 - Sessions Pending Review → SCR-TC-003 - Students in Therapy → SCR-TC-004 - Teachers On Duty → SCR-TC-005 |
| Live Session Status       | Visual Board / List | Shows real-time status of all active therapy sessions. | Status indicators: Green / Yellow / Red based on session condition.                                                                                                                                                  |
| Pending Review Alerts     | Scrollable List     | Shows session summaries awaiting review.               | Click "Review" → SCR-TC-003                                                                                                                                                                                          |
| Daily Operational Summary | Section             | Summary of daily operations.                           | Sessions completed, trials logged, incidents, goals mastered                                                                                                                                                         |
| Quick Action Buttons      | Buttons             | Navigation shortcuts.                                  | Links to SCR-TC-002 to SCR-TC-005                                                                                                                                                                                    |
| Notifications Bell        | Icon                | System notifications.                                  | Red badge shows unread alerts                                                                                                                                                                                        |

## _Screen ID: SCR-TC-002 - Live Session Monitoring_

### Purpose

Enable real-time monitoring of active therapy sessions.

Pre-Conditions:

User logged in as Therapy Coordinator.

At least one session is active (teacher logged in and started a session).

Post-Conditions: Coordinator gains real-time visibility into all active sessions and can take action if needed.

### Components

| **Component**         | **Type**             | **Description**                       | **Validation / Behavior**                                    |
| --------------------- | -------------------- | ------------------------------------- | ------------------------------------------------------------ |
| Active Sessions Grid  | Grid / Card View     | Displays all active sessions.         | Shows teacher, station, timer, students, trial count, status |
| Session Detail View   | Modal / Inline Panel | Detailed session monitoring.          | Shows student-level session data and incidents               |
| Send Alert to Teacher | Button               | Sends notification to teacher device. | Requires message + alert type                                |
| View Teacher Screen   | Button               | Live teacher screen view.             | Post-MVP (disabled)                                          |
| Session Status Filter | Dropdown             | Filters sessions by status.           | All / On Track / Needs Attention / Overdue                   |
| Station Filter        | Dropdown             | Filters by station.                   | Station 1 / Station 2                                        |
| Refresh               | Button               | Manual refresh.                       | Auto-refresh every 30 seconds                                |
| Export Session Log    | Button               | Exports session data.                 | CSV/PDF export                                               |

## _Screen ID: SCR-TC-003 - Session Summary Review_

### Purpose

Review and approve or request changes to session summaries.

Pre-Conditions:

User logged in as Therapy Coordinator.

At least one session summary has been submitted by a teacher (SCR-005).

Post-Conditions:

Session summary is approved (becomes part of the student's permanent record).

Session summary is returned to the teacher for revision (with feedback).

Teacher receives notification of the decision.

### Components

| **Component**               | **Type**                 | **Description**                    | **Validation / Behavior**           |
| --------------------------- | ------------------------ | ---------------------------------- | ----------------------------------- |
| Pending Review List         | Scrollable Table         | Lists submitted session summaries. | Review action opens full summary    |
| Filter Controls             | Dropdowns / Date Pickers | Filters results.                   | Student, Teacher, Station, Date     |
| Search                      | Text Input               | Search sessions.                   | Real-time filter                    |
| Session Summary Detail View | Modal                    | Full session review.               | Includes approval workflow          |
| Approve Session             | Button                   | Approves summary.                  | Moves to permanent record           |
| Request Changes             | Button                   | Sends back for revision.           | Requires reason + section selection |
| Add Coordinator Notes       | Text Area                | Internal notes.                    | Internal only                       |
| Print/Export PDF            | Button                   | Exports summary.                   | PDF generation                      |
| View Student Progress       | Button                   | Opens SCR-TC-004.                  | Context navigation                  |
| Bulk Approve                | Checkbox + Button        | Approves multiple.                 | Confirmation required               |

## _Screen ID: SCR-TC-004 - Student Progress Monitoring_

### Purpose

Track student progress across therapy sessions.

Pre-Conditions: User logged in as Therapy Coordinator. Student data exists.

Post-Conditions: Coordinator gains full visibility into student progress.

### Components

| **Component**            | **Type**          | **Description**             | **Validation / Behavior**     |
| ------------------------ | ----------------- | --------------------------- | ----------------------------- |
| Student Selector         | Dropdown / Search | Select student.             | Required                      |
| Student Profile Summary  | Card              | Basic student info.         | Links to SCR-006A             |
| Assessment Summary       | Section           | 6-week assessment summary.  | Skills, behavior, preferences |
| Current Goals            | Section           | Active goals tracking.      | Progress %, status            |
| Session History          | Scrollable Table  | Past sessions list.         | Click opens session summary   |
| Goal Progress Chart      | Chart (Line)      | Goal performance over time. | Multi-goal visualization      |
| Behavior Incident Trends | Chart / List      | Behavior tracking.          | Frequency + details           |
| Notes Section            | Text Area         | Internal notes.             | Internal only                 |
| Alert Flag               | Toggle            | Flag student.               | Creates notification          |
| Print Report             | Button            | Export report.              | PDF output                    |

## _Screen ID: SCR-TC-005 - Operational Management_

### Purpose

Manage teacher schedules and operational logistics.

Pre-Conditions: User logged in as Therapy Coordinator. Staff and student data exist.

Post-Conditions: Operational changes are tracked and reflected in the system.

### Components

| **Component**            | **Type**        | **Description**         | **Validation / Behavior**                 |
| ------------------------ | --------------- | ----------------------- | ----------------------------------------- |
| Teacher Schedule View    | Calendar / Grid | Weekly schedule view.   | Shows assignments                         |
| Teacher Filter           | Dropdown        | Filter teachers.        | All / specific                            |
| Performance Metrics      | Section         | KPI tracking.           | Sessions, trials, independence, incidents |
| Mark Teacher Unavailable | Button          | Set unavailability.     | Requires reason + date                    |
| Reassign Students        | Button          | Reassign students.      | Capacity validation required              |
| View Teacher Summary     | Button          | Teacher analytics view. | Full performance view                     |
| Export Schedule          | Button          | Export schedule.        | PDF/CSV                                   |
| Student Unassigned Alert | Warning         | Missing assignments.    | Highlights issues                         |

## _Screen ID: SCR-TC-006 - Parent Communication (Coordinator View)_

### Purpose

Manage communication between therapy team and parents.

Pre-Conditions:

Parent accounts exist (linked to students).

Parent has initiated a conversation, or Coordinator needs to share operational updates.

Post-Conditions: Messages are sent and tracked. Communication history is preserved.

### Components

| **Component**                | **Type**        | **Description**        | **Validation / Behavior** |
| ---------------------------- | --------------- | ---------------------- | ------------------------- |
| Conversation List            | Scrollable List | Parent conversations.  | Includes unread badges    |
| Filter Controls              | Dropdowns       | Filter conversations.  | Student / Date            |
| Search                       | Text Input      | Search messages.       | Real-time                 |
| Conversation View            | Chat Interface  | Messaging interface.   | Thread-based view         |
| Share Schedule               | Button          | Share schedule.        | Adds message context      |
| Share Progress Update        | Button          | Share charts.          | Links SCR-PD-008          |
| Escalate to Program Director | Button          | Escalation flow.       | Sends notification        |
| Escalate to Director         | Button          | High-level escalation. | Director notified         |
| Communication Log            | Tab             | History view.          | Audit trail               |
| Mark as Resolved             | Button          | Closes conversation.   | Moves to resolved         |

# Parent - Screen Specifications

## _Screen ID: SCR-PAR-001 - Parent Dashboard_

| **Field**   | **Value**         |
| ----------- | ----------------- |
| Screen ID   | SCR-PAR-001       |
| Screen Name | Parent Dashboard  |
| User Role   | Parent / Guardian |
| Platform    | Mobile / Web      |

### Purpose

Centralized view of child's therapy journey.

### Components

| **Component**          | **Type** | **Description**      | **Validation / Behavior**            |
| ---------------------- | -------- | -------------------- | ------------------------------------ |
| Header                 | Text     | Welcome message      | Personalized                         |
| Child Progress Summary | Card     | High-level progress  | Independence %, sessions             |
| Recent Updates Feed    | List     | Therapy updates      | Click navigates                      |
| Quick Actions          | Buttons  | Navigation shortcuts | Progress, observation, communication |
| Notifications Bell     | Icon     | Alerts               | Badge count                          |
| Communication Shortcut | Card     | Latest message       | Opens SCR-PAR-004                    |

## Screen ID: SCR-PAR-002 - Child Progress View

### Purpose

Provide detailed child progress visibility.

### Components

| **Component**             | **Type**  | **Description**      | **Validation / Behavior** |
| ------------------------- | --------- | -------------------- | ------------------------- |
| Student Header            | Read-only | Student info         | Auto                      |
| Overall Progress Summary  | Section   | Progress indicators  | Goals, sessions           |
| Goal Progress Charts      | Chart     | Goal tracking        | Weekly visualization      |
| Session History           | Table     | Session list         | Click opens details       |
| Session Summary View      | Modal     | Session details      | Parent-friendly           |
| Behavior Incident Summary | Section   | Behavior trends      | Simplified                |
| Assessment Results        | Section   | Assessment summary   | Simplified language       |
| IUP Summary               | Section   | Therapy plan summary | PDF export                |
| Notes                     | Read-only | Shared notes         | Filtered visibility       |

## Screen ID: SCR-PAR-003 - Home Observation Log

### Purpose

Allow parents to record home-based observations.

### Components

| **Component**       | **Type** | **Description**   | **Validation / Behavior** |
| ------------------- | -------- | ----------------- | ------------------------- |
| Observation History | List     | Past observations | Click to view             |
| Add Observation     | Button   | Create new entry  | Opens form                |
| Observation Form    | Modal    | Data entry        | Required fields           |
| Acknowledged Status | Badge    | Status tracking   | Color-coded               |
| Team Response       | Section  | Staff replies     | Visible updates           |
| Request from Team   | Section  | Requested logs    | Pre-filled form           |

## Screen ID: SCR-PAR-004 - Parent Communication

### Purpose

Enable direct communication with therapy team.

### Components

| **Component**       | **Type**        | **Description**     | **Validation / Behavior** |
| ------------------- | --------------- | ------------------- | ------------------------- |
| Conversation List   | Scrollable List | Messages overview   | Unread tracking           |
| Conversation View   | Chat Interface  | Messaging system    | Threaded view             |
| Send Message        | Button          | Send communication  | Required text             |
| Quick Actions       | Buttons         | Templates           | Pre-filled messages       |
| Team Identification | Tags            | Sender labels       | Role-based                |
| Escalation Status   | Badge           | Escalation tracking | Transparency              |
| Communication Log   | Tab             | History             | Audit                     |
| Mark as Resolved    | Button          | Close thread        | Reopen allowed            |