# SCR-009 to SCR-015 Detailed Screen Specifications

## SCR-009 - Enrollment Wizard

### Screen Identification

| Field       | Value                                 |
| ----------- | ------------------------------------- |
| Screen ID   | SCR-009                               |
| Screen Name | Enrollment Wizard                     |
| User Roles  | Program Director, Therapy Coordinator |
| Platform    | Tablet - Landscape                    |

### Purpose, Pre-Conditions & Post-Conditions

Purpose: Guide enrollment of a new child, collect information, documents, media, and suggested placement. Pre-Conditions: User logged in as Director or Coordinator. Parent/guardian present. Post-Conditions: Student created with status 'In Assessment'.

### Components & Interaction Details

| Component                                                   | Type          | Description                                         | Validation / Behavior          |
| ----------------------------------------------------------- | ------------- | --------------------------------------------------- | ------------------------------ |
| Full Name (Child) <br>First name, Middle name, Last name    | Text Input    | Child legal name                                    | Required                       |
| Date of Birth                                               | Date Picker   | DOB entry                                           | Required; age auto-calculated  |
| Diagnosis                                                   | Text Input    | Diagnosis information                               | Required                       |
| Parent/Guardian Name <br>First name, Middle name, Last name | Text Input    | Primary contact                                     | Required                       |
| Parent Phone                                                | Tel Input     | Phone number                                        | Required; format validation    |
| Document Uploads                                            | Upload        | Birth certificate, diagnosis paper, agreement paper | Status tracked                 |
| Permission                                                  | checkbox      | Ask parent to record kid                            | Optional, if selected continue |
| Parent Interview form                                       | Form          | User records the answers                            | Required                       |
| Headshot Photo                                              | Camera/Upload | Capture or upload photo                             | Required                       |
| Baseline Video                                              | Record/Upload | Record or upload video of child                     | Optional                       |
| Program Type Selector                                       | Radio Group   | Regular or Pooled Out                               | Required                       |
| Therapy Group Selector                                      | Radio Group   | Basic Therapy or Functional Living Skills           | Required                       |
| Confirm & Enroll                                            | Button        | Create student record                               | Finalizes enrollment           |

## SCR-010 - 6-Week Assessment Dashboard

### Screen Identification

| Field       | Value                       |
| ----------- | --------------------------- |
| Screen ID   | SCR-010                     |
| Screen Name | 6-Week Assessment Dashboard |
| User Roles  | Teacher                     |
| Platform    | Tablet - Landscape          |

### Purpose, Pre-Conditions & Post-Conditions

Purpose: Track students in assessment period and launch assessment sessions.  
Pre-Conditions: Teacher logged in with assigned assessment students.  
Post-Conditions: Assessment session opened and progress tracked.

### Components & Interaction Details

| Component           | Type             | Description                                            | Validation / Behavior     |
| ------------------- | ---------------- | ------------------------------------------------------ | ------------------------- |
| Header              | Text             | Assessment tracker title                               | Static                    |
| Student List        | Scrollable Cards | Assigned students                                      | Sorted by enrollment date |
| Continue Assessment | Button           | Open session picker                                    | Label changes by progress |
| Session Type Picker | Modal            | Skills, Preference, Behavior, Sensory Time Engagement  | Opens selected screen     |
| Back Button         | Button           | Return to dashboard                                    | Always visible            |

## SCR-011 - ABLLS-R Skills Assessment

### Screen Identification

| Field       | Value                     |
| ----------- | ------------------------- |
| Screen ID   | SCR-011                   |
| Screen Name | ABLLS-R Skills Assessment |
| User Roles  | Teacher                   |
| Platform    | Tablet - Landscape        |

> **Note:** This screen is also specified as **SCR-TEA-002** ("Skills Assessment (ABLLS-R)") in `Therapist Teacher Role Screens.md`. Both IDs refer to the same screen; SCR-TEA-002 adds the full domain-by-domain component detail.

### Purpose, Pre-Conditions & Post-Conditions

Purpose: Record ABLLS-R skills using color-coded scoring.  
Pre-Conditions: Student selected for skills assessment.  
Post-Conditions: Scores saved and Color Need Analysis updated.

### Components & Interaction Details

| Component       | Type            | Description              | Validation / Behavior  |
| --------------- | --------------- | ------------------------ | ---------------------- |
| Domain Selector | Dropdown/Tabs   | Choose assessment domain | Loads skill items      |
| Color Key       | Legend          | Red, Yellow, Green, Gray | Always visible         |
| Skill Item List | Scrollable Rows | Score each skill         | Single color selection |
| Domain Progress | Text            | Items scored count       | Real-time update       |
| Notes Field     | Multi-line Text | Teacher notes            | Optional               |
| Color Need Map  | Overlay         | Visual deficit map       | Generated from scores  |

## SCR-012 - Preference Assessment

### Screen Identification

| Field       | Value                 |
| ----------- | --------------------- |
| Screen ID   | SCR-012               |
| Screen Name | Preference Assessment |
| User Roles  | Teacher               |
| Platform    | Tablet - Landscape    |

### Purpose, Pre-Conditions & Post-Conditions

Purpose: Track preferred items using duration and frequency across Sensory Time, Circle Time, and Play Time. The assessment uses a pre-defined inventory of items that mirrors the physical preference assessment form

Pre-Conditions: Preference Assessment selected.  
Post-Conditions: Preference data saved and ranked.

### Components & Interaction Details

| Component              | Type            | Description                             | Validation/Behavior                                     |
| ---------------------- | --------------- | --------------------------------------- | ------------------------------------------------------- |
| **Student Header**     | Read-only       | Student photo, name, age                | Auto-populated                                          |
| **Context Selector**   | Tabs            | Switch between assessment contexts      | Options: Sensory Time, Circle Time, Play Time           |
| **Item Inventory**     | Scrollable Grid | Displays all items for selected context | Categorized: Visual, Auditory, Tactile, Toys, Movement  |
| **Category Header**    | Label           | Category name                           | Static: Visual, Auditory, Tactile, Toys, Movement       |
| **Item Row**           | Row             | Individual item with controls           | Shows: Item name, Category badge, Timer, Counter        |
| **Item Name**          | Label           | Name of the item                        | From inventory (pre-loaded)                             |
| **Timer**              | Timer Control   | Track engagement duration               | Start/Pause/Reset buttons. Auto-updates                 |
| **Counter**            | +/- Controls    | Track engagement frequency              | Increment/decrement counter                             |
| **Duration Display**   | Read-only       | Total engagement time                   | Auto-calculated from timer data                         |
| **Frequency Display**  | Read-only       | Total engagement count                  | Auto-calculated from counter data                       |
| **Notes Field**        | Text Input      | Optional notes for the item             | Free text                                               |
| **Add Custom Item**    | Button          | Add item not in inventory               | Opens modal to enter item name and category             |
| **Ranked Preferences** | Section         | Displays ranked list of preferences     | Auto-calculated. Shows: Rank, Item, Duration, Frequency |
| **Top 5 Preferences**  | Card            | Shows top 5 preferences                 | Used for IUP creation and reinforcement planning        |
| **Save Draft**         | Button          | Saves assessment draft                  | Teacher can return later                                |
| **Submit Assessment**  | Button          | Submits completed assessment            | Validates at least 3 items have data                    |
| **Print/Export**       | Button          | Exports assessment as PDF               | Includes item list and rankings                         |

SCR-012A: Sensory Time Engagement

Screen ID: SCR-012A

Screen Name: Sensory Time Engagement

User Role: Teacher / Therapist

Platform: Tablet (Landscape)

Purpose: Evaluate the student's engagement and response to various sensory activities during the 6-week assessment period. This assessment mirrors the physical Sensory Time Engagement form.

Pre-Conditions: Student is in the "In Assessment" status Teacher has accessed the assessment from SCR-010

Post-Conditions: Sensory Time Engagement data is saved Data is available for IUP creation and Program Director review

Component Details:

| Component           | Type             | Description                     | Validation/Behavior                                                                 |
| ------------------- | ---------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| Student Header      | Read-only        | Student photo, name, age        | Auto-populated                                                                      |
| Assessment Date     | Date Picker      | Date of assessment              | Auto-populates to today, can be changed                                             |
| Student Name        | Read-only        | Student name                    | Auto-populated                                                                      |
| Activity List       | Scrollable Table | Displays all sensory activities | 12 default activities from inventory                                                |
| Activity ID         | Read-only        | Unique identifier               | SEN-001 to SEN-012                                                                  |
| Activity Name       | Read-only        | Name of the activity            | From inventory                                                                      |
| Engagement Level    | Dropdown         | Level of assistance required    | Options: Independent, Partial Physical Prompt, Full Physical Prompt, Not Applicable |
| Response/Reaction   | Dropdown         | Student's reaction              | Options: Enjoyed, Neutral, Refused, Not Observed                                    |
| Remark              | Text Input       | Qualitative observation         | Free text, optional                                                                 |
| Add Custom Activity | Button           | Add activity not in inventory   | Opens modal to enter activity name                                                  |
| Progress Indicator  | Visual           | Shows completion percentage     | Auto-calculated from scored activities                                              |
| Summary             | Section          | Overview of engagement          | Counts by engagement level and response                                             |
| Save Draft          | Button           | Saves assessment draft          | Teacher can return later                                                            |
| Submit Assessment   | Button           | Submits completed assessment    | Validates at least 3 activities scored                                              |
| Print/Export        | Button           | Exports assessment as PDF       | Includes full activity list with engagement levels and responses                    |

## SCR-013 - MAS / FAST Questionnaire

### Screen Identification

| Field       | Value                     |
| ----------- | ------------------------- |
| Screen ID   | SCR-013                   |
| Screen Name | MASS / FAST Questionnaire |
| User Roles  | Teacher                   |
| Platform    | Tablet - Landscape        |

> **Note:** This screen is also specified as **SCR-TEA-003** ("Behavior Assessment (MASS/FAST + ABC Tracking)") in `Therapist Teacher Role Screens.md`. Both IDs refer to the same screen; SCR-TEA-003 adds the MASS/FAST/ABC tab detail.

### Purpose, Pre-Conditions & Post-Conditions

Purpose: Complete behavior questionnaires and record incidents.  
Pre-Conditions: Behavior Assessment selected.  
Post-Conditions: Questionnaires scored and saved.

### Components & Interaction Details

| Component              | Type          | Description            | Validation / Behavior   |
| ---------------------- | ------------- | ---------------------- | ----------------------- |
| Questionnaire Selector | Cards         | MASS or FAST           | Shows status            |
| ABC Incidents          | Card + Button | Open incident logging  | Links records           |
| Question Display       | Text          | Current question       | One at a time           |
| Likert Response        | Radio Group   | Never to Always        | Required                |
| Progress Indicator     | Text          | Question progress      | Updates dynamically     |
| Complete Assessment    | Button        | Finalize questionnaire | Disabled until complete |

## SCR-014 - IUP Creation & Goal Assignment

### Screen Identification

| Field       | Value                                 |
| ----------- | ------------------------------------- |
| Screen ID   | SCR-014                               |
| Screen Name | IUP Creation & Goal Assignment        |
| User Roles  | Program Director, Therapy Coordinator |
| Platform    | Tablet - Landscape                    |

> **Note:** This screen is also specified as **SCR-PD-003** ("IUP Generation & Management") in `Director Screens Overview.md`. SCR-PD-003 is the authoritative, detailed specification; SCR-014 is its concise summary.

### Purpose, Pre-Conditions & Post-Conditions

Purpose: Review assessment data and assign therapy goals.  
Pre-Conditions: 6-week assessment completed.  
Post-Conditions: IUP saved or finalized; student may become Active.

### Components & Interaction Details

| Component          | Type      | Description                                            | Validation / Behavior                         |
| ------------------ | --------- | ------------------------------------------------------ | --------------------------------------------- |
| Select student     | list      | View Student list with go to assessment summary button | List students who completed 6 week assessment |
| Assessment Summary | Card      | Aggregated assessment data                             | Auto-generated                                |
| IUP form           | Open form | Prefilled with selected student information            | Required for finalization                     |
| Goal Slots         | Dropdowns | Assign goals per station                               | Manual selection                              |
| Suggested Goals    | Text      | System recommendations                                 | Not mandatory                                 |
| Save Draft         | Button    | Save without activation                                | Keeps assessment status                       |
| Finalize IUP       | Button    | Activate therapy                                       | Requires goals and IUP                        |

## SCR-015 - Assessment Summary Report

### Screen Identification

| Field       | Value                                 |
| ----------- | ------------------------------------- |
| Screen ID   | SCR-015                               |
| Screen Name | Assessment Summary Report             |
| User Roles  | Program Director, Therapy Coordinator |
| Platform    | Tablet - Landscape                    |

> **Note:** This report is opened from **SCR-PD-002** ("Assessment Review & Approval", `Director Screens Overview.md`) via the "View Report" action. SCR-015 is the shared, read-only Assessment Summary Report.

### Purpose, Pre-Conditions & Post-Conditions

Purpose: Generate printable/downloadable assessment report.  
Pre-Conditions: Assessment completed and data exists.  
Post-Conditions: PDF generated; no data changed.

### Components & Interaction Details

| Component                     | Type              | Description            | Validation / Behavior |
| ----------------------------- | ----------------- | ---------------------- | --------------------- |
| Student Information           | Read-only Section | Core student data      | Auto-populated        |
| Skills Assessment Section     | Read-only         | Need map and summaries | Auto-generated        |
| Behavior Assessment Section   | Read-only         | MASS/FAST results      | Auto-generated        |
| Preference Assessment Section | Read-only         | Top preferences        | Auto-generated        |
| IUP Status Section            | Read-only         | Goals and status       | Auto-generated        |
| Download PDF                  | Button            | Export report          | Creates PDF           |