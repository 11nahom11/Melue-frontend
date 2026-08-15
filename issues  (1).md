# 1.Foundation & Admin Setup (MR-1) \- 

This epic contains all the core features that must exist before therapists, students, or parents can use the system. 

MR-3 Database Schema & API Foundation – This is where the application's database and backend APIs are designed. It defines how information is stored and how different parts of the application communicate

MR-4 Login & Authentication – Allows users to securely log into the application.  
 Users may include:

* System Admin  
* Institutional Admin  
* Director  
* Program Director  
* Therapy Coordinator  
* Therapist  
* Teacher  
* Parent

### **Features**

* Login screen  
* Password hashing  
* Session management  
* JWT authentication  
* Logout  
* Forgot Password  
* Reset Password

# **MR-5 Staff Account & Role Management (System Admin)**

Allows the administrator to manage staff accounts.

### **Features**

Create Staff

Edit Staff

Deactivate Staff

Delete Staff

Assign Roles

### **Permissions**

The system should prevent users from accessing pages they are not allowed to see.

# **MR-6 Admin Panel Shell & Clinical Configuration**

Build the main administration dashboard and configuration pages.

Admin should be able to configure things like:   
programs \- ABA   
 	      Speech Therapy   
  	      Occupational Therapy 

Assessment Types

Goal Categories

Therapy Types

Behavior Categories

Session Lengths

Clinic Information

Working Hours

School Settings

### **Features**

Navigation menu

Sidebar

Dashboard layout

Settings pages

CRUD for all configurations

# **MR-7 Tablet Offline-First Architecture**

### **What it is**

Therapists often work where Wi-Fi is weak or unavailable.

The application should still work without the internet.

### **Features**

Store information locally.

When internet returns:

Automatically synchronize.

### **Example**

Therapist records:

✔ Session

✔ Notes

✔ Goals

No internet.

Everything is saved locally.

Later Wi-Fi returns.

↓

Automatically upload everything.

### **Technologies**

* Local database  
* IndexedDB  
* SQLite (depending on platform)  
* Sync engine  
* Conflict resolution

### **Why it's important**

Therapy sessions should never be interrupted because of poor internet.

# **MR-8 Audit Logging Foundation**

### **What it is**

Track every important action in the system.

This is especially important in healthcare and education systems for accountability.

### **Example logs**

John created Student \#102  
Sara updated Goal \#45  
Michael deleted Assessment \#13  
Admin changed clinic settings

Each log should include:

* User  
* Action  
* Date  
* Time  
* IP Address (optional)  
* Old Value  
* New Value

### **Why it's important**

If something goes wrong, administrators can see exactly who made the change and when.

### **Main responsibility**

Backend

The frontend only displays logs.

# **2\. Student Enrollment & Profile (MR-16)**

This module is responsible for **adding students into the system** and maintaining their personal, medical, and educational information. Everything else (assessments, therapy sessions, reports) depends on having a complete student profile.

# **MR-18 Student Register**

## **What it is**

This is the page where administrators or authorized staff can **register a new student**.

## **Validation**

The system should ensure:

* Required fields are completed.  
* Duplicate students are not created.  
* Invalid phone numbers or emails are rejected.

# **MR-19 Enrollment Wizard**

## **What it is**

Instead of showing one huge registration form, the system guides users through **multiple steps**.

This makes enrollment easier and reduces mistakes.

## **Example Flow**

### **Step 1**

Student Information

↓

### **Step 2**

Parent Information

↓

### **Step 3**

Medical Information

↓

### **Step 4**

Documents

↓

### **Step 5**

Assign Therapist

↓

### **Step 6**

Review

↓

Finish Enrollment

---

## **Features**

Progress bar

Step 1 ✓

Step 2 ✓

Step 3 →

Step 4

Step 5

Step 6

Users can:

* Go back  
* Save progress  
* Continue later  
* Review everything before submitting

## **Document Upload**

The wizard should allow uploading:

* Birth Certificate  
* Medical Reports  
* Assessment Reports  
* Referral Letter  
* Insurance Documents (if applicable)

Supported formats:

* PDF  
* JPG  
* PNG

## **Why use a wizard?**

Without it:

One page with 50+ fields can overwhelm users.

With a wizard:

✔ Easier

✔ Cleaner

✔ Fewer mistakes

# **Student Profile (part of MR-16)**

**Once a student is enrolled, staff should be able to open the student's profile at any time.**

**Student Profile Page**

**It should display:**

### **Personal Information**

* **Name**  
* **Age**  
* **Gender**  
* **Student ID**

### **Parent Information**

* **Parent Name**  
* **Phone**  
* **Email**

### **Clinical Information**

* **Diagnosis**  
* **Assigned Therapist**  
* **Assigned Teacher**  
* **Program**

### **Documents**

* **Medical Reports**  
* **Assessments**  
* **Uploaded Files**

### **Progress Summary**

**Quick overview of:**

* **Completed sessions**  
* **Current goals**  
* **Assessment scores**  
* **Behavior incidents**

### **Timeline**

**Example**

**Jan 5**

**Student Registered**

**↓**

**Jan 10**

**Assessment Completed**

**↓**

**Jan 14**

**Therapy Started**

**↓**

**Jan 28**

**Behavior Incident**

**↓**

**Feb 2**

**Goal Updated**

**This helps staff quickly understand the student's history.**

---

## **Search & Filtering**

**The student list should support filtering by:**

* **Name**  
* **Program**  
* **Therapist**  
* **Status (Active/Inactive)**  
* **Age**  
* **Diagnosis**

**Example:**

**Program:**

**ABA**

**Status:**

**Active**

**Therapist:**

**John**

**Only matching students are shown.**

## **Permissions**

**Different users should see different information:**

| Role | Permissions |
| ----- | ----- |
| **Admin** | **Full access** |
| **Program Director** | **View and edit students** |
| **Therapist** | **View assigned students, update therapy-related information** |
| **Parent** | **View only their own child's profile (limited information)** |

## **Database Relationships**

**A student is linked to many other parts of the system:**

**Student**

   **│**

   **├── Parent**

   **├── Therapist**

   **├── Assessments**

   **├── Therapy Sessions**

   **├── Goals**

   **├── Behavior Incidents**

   **├── Reports**

   **└── Notifications**

**This is why enrollment is completed before building the assessment and therapy modules.**

# **3\. 6-Week Assessment (MR-20)**

## **What is this module?**

**When a new student joins the therapy center, they usually undergo an initial assessment during the first few weeks. This helps therapists understand the student's strengths, challenges, and needs before creating a treatment plan.**

**The 6-Week Assessment module allows therapists to perform, record, and review these evaluations.**

---

# **Workflow**

**Student Enrolled**

        **│**

        **▼**

**Start Assessment**

        **│**

        **▼**

**Complete Different Assessment Types**

        **│**

        **▼**

**View Assessment Dashboard**

        **│**

        **▼**

**Generate Results**

        **│**

        **▼**

**Use Results to Create IUP & Goals**

---

# **MR-21 Assessment Dashboard**

## **What it is**

**This is the main screen where therapists can see all assessment-related information for a student.**

**Instead of searching through multiple pages, everything is displayed in one place.**

---

## **Features**

**Display:**

* **Assessment status**  
* **Completed assessments**  
* **Pending assessments**  
* **Progress percentage**  
* **Assigned therapist**  
* **Assessment date**  
* **Overall score (if applicable)**

---

## **Example**

**Student: Emily Johnson**

**Assessment Progress**

**Skills Assessment          ✓ Completed**

**Behavior Assessment        ✓ Completed**

**Preference Assessment      Pending**

**Sensory Assessment         Pending**

**Overall Progress**

**50%**

---

## **Dashboard Widgets**

**Possible cards:**

* **Assessments Completed**  
* **Assessments Remaining**  
* **Recent Notes**  
* **Next Appointment**  
* **Last Updated**  
* **Assigned Therapist**

---

## **Main Responsibility**

**Frontend:**

* **Dashboard UI**  
* **Charts**  
* **Progress indicators**

**Backend:**

* **Retrieve assessment data**  
* **Calculate progress**

**Overall:**

**✅ Full Stack**

---

# **MR-22 Skills Assessment**

## **What it is**

**Evaluates what the student can already do.**

**Therapists observe and score different abilities.**

## **Categories**

**Communication**

**Example:**

* **Says own name**  
* **Answers questions**  
* **Requests items**

---

**Social Skills**

**Example:**

* **Makes eye contact**  
* **Plays with others**  
* **Takes turns**

---

**Academic Skills**

**Example:**

* **Counts numbers**  
* **Reads letters**  
* **Matches colors**

---

**Self-Care**

**Example:**

* **Brushes teeth**  
* **Washes hands**  
* **Eats independently**

---

**Motor Skills**

**Example:**

* **Holds pencil**  
* **Runs**  
* **Climbs stairs**

---

## **Example Form**

**Communication**

**Can answer yes/no questions?**

**○ Independent**

**○ With Prompt**

**○ Not Yet**

---

## **Features**

* **Save responses**  
* **Edit responses**  
* **Add therapist notes**  
* **Calculate scores**  
* **Compare previous assessments**

---

## **Main Responsibility**

**Frontend:**

* **Forms**  
* **Assessment interface**

**Backend:**

* **Store responses**  
* **Calculate results**

**Overall:**

**✅ Full Stack**

---

# **MR-23 Behavior Assessment**

## **What it is**

**Used to identify behaviors that may affect learning or therapy.**

---

## **Example Behaviors**

* **Aggression**  
* **Self-injury**  
* **Tantrums**  
* **Running away (elopement)**  
* **Non-compliance**  
* **Property destruction**  
* **Repetitive behaviors**

---

## **Therapist records:**

**Behavior**

**Frequency**

**Duration**

**Intensity**

**Trigger**

**Consequence**

---

## **Example**

**Behavior:**

**Tantrum**

**Frequency:**

**3 times**

**Duration:**

**5 minutes**

**Trigger:**

**Asked to clean toys**

**Notes:**

**Student calmed after verbal prompting.**

---

## **Features**

* **Add behaviors**  
* **Update observations**  
* **Track trends over time**  
* **Generate reports**

---

## **Main Responsibility**

**Mostly Full Stack**

---

# **MR-24 Preference Assessment**

## **What it is**

**Determines what motivates the student.**

**This helps therapists choose effective rewards and engaging activities.**

## **Example**

**Therapist tests:**

**Foods**

**Toys**

**Games**

**Music**

**Videos**

**Activities**

## **Example Result**

**Highly Preferred**

**✔ Bubbles**

**✔ Toy Cars**

**✔ iPad Game**

**Moderately Preferred**

**Blocks**

**Drawing**

**Low Preference**

**Puzzle**

## **Why is this important?**

**A child is often more motivated to learn when activities or rewards they enjoy are used during therapy.**

## **Features**

* **Rank preferences**  
* **Save results**  
* **Update over time**  
* **Display favorite items**

## **Main Responsibility**

**Frontend:**

* **Selection interface**

**Backend:**

* **Save rankings**

**Overall:**

**✅ Full Stack**

# **MR-25 Sensory Time Engagement Assessment**

## **What it is**

**Evaluates how the student responds to different sensory experiences.**

**This is especially useful for occupational therapy and autism support.**

## **Areas Assessed**

**Visual**

**Auditory**

**Touch**

**Movement (Vestibular)**

**Balance**

**Textures**

**Temperature**

**Noise**

**Lights**

## **Example**

**Loud Noise**

**Response:**

**○ Enjoys**

**○ Neutral**

**○ Avoids**

**Another example:**

**Swinging**

**Response:**

**✔ Enjoys**

## **Features**

* **Therapist observations**  
* **Rating scales**  
* **Notes**  
* **Save results**  
* **Compare previous assessments**

# **How These Assessments Work Together**

**Each assessment provides a different perspective on the student's needs:**

| Assessment | Purpose |
| ----- | ----- |
| **Skills Assessment** | **Measures current abilities and developmental skills.** |
| **Behavior Assessment** | **Identifies challenging behaviors and their patterns.** |
| **Preference Assessment** | **Finds motivating rewards and favorite activities.** |
| **Sensory Time Engagement Assessment** | **Evaluates responses to sensory experiences.** |

# **5\. Active Therapy Delivery (MR-31)**

## **What is this module?**

**This module manages the actual therapy sessions. Once a student's IUP and goals are ready, therapists use this part of the system to:**

* **Start therapy sessions**  
* **Record student performance**  
* **Collect data**  
* **Record behaviors**  
* **Write notes**  
* **Update goal progress**

**Think of it as the therapist's daily workspace.**

# **Workflow**

**Student Arrives**

      **│**

      **▼**

**Open Therapy Session**

      **│**

      **▼**

**Work on Assigned Goals**

      **│**

      **▼**

**Record Data**

      **│**

      **▼**

**Record Behaviors**

      **│**

      **▼**

**Write Session Notes**

      **│**

      **▼**

**Update Goal Progress**

      **│**

      **▼**

**Complete Session**

# **MR-32 Therapy Session Dashboard**

## **What is it?**

**This dashboard shows everything a therapist needs before and during a therapy session.**

**Instead of opening multiple pages, all important information is displayed together.**

## **Display**

**Student Information**

**Today's Schedule**

**Assigned Goals**

**Previous Session Notes**

**Behavior Alerts**

**Session Timer**

## **Example**

**Emily Johnson**

**Today's Goals**

**✔ Request preferred items**

**✔ Eye Contact**

**✔ Turn Taking**

**Session**

**10:00 AM \- 11:00 AM**

**Therapist**

**John Smith**

## **Dashboard Cards**

* **Student Profile**  
* **Current Goals**  
* **Session Timer**  
* **Behavior Alerts**  
* **Progress Summary**  
* **Previous Session**  
* **Quick Notes**

## **Features**

* **Start session**  
* **Pause session**  
* **Resume session**  
* **End session**  
* **View previous sessions**

## **Main Responsibility**

**Frontend:**

* **Dashboard**  
* **Timer**  
* **Layout**

**Backend:**

* **Session APIs**  
* **Student data**

**Overall:**

**✅ Full Stack**

# **MR-33 Session Data Collection**

## **What is it?**

**During therapy, therapists record how well students perform each goal.**

**Instead of writing everything on paper, data is entered directly into the system.**

## **Example**

**Goal:**

**Respond to Name**

**Trial Results**

**Trial 1**

**✔ Correct**

**Trial 2**

**✖ Incorrect**

**Trial 3**

**✔ Correct**

**Trial 4**

**✔ Correct**

## **Other Data Types**

**Frequency**

**Duration**

**Percentage**

**Prompt Level**

**Accuracy**

**Latency**

## **Prompt Levels**

**Example**

**Independent**

**Verbal Prompt**

**Gesture Prompt**

**Physical Prompt**

## **Automatic Calculations**

**Instead of calculating manually,**

**System calculates:**

**Correct**

**8**

**Incorrect**

**2**

**Accuracy**

**80%**

## **Features**

* **Quick data entry**  
* **Automatic calculations**  
* **Save drafts**  
* **Offline support**  
* **Export session data**

## **Main Responsibility**

**Frontend:**

* **Data entry interface**

**Backend:**

* **Save trials**  
* **Calculate statistics**

**Overall**

**✅ Full Stack**

# **MR-34 Behavior Incident Tracking (ABC Method)**

## **What is it?**

**Therapists record challenging behaviors during sessions using the ABC Method, which helps identify why behaviors occur.**

**ABC stands for:**

* **A – Antecedent: What happened before the behavior?**  
* **B – Behavior: What exactly did the student do?**  
* **C – Consequence: What happened immediately after?**

## **Example**

**Antecedent**

**Teacher asked student to clean up toys.**

**↓**

**Behavior**

**Student screamed and threw toys.**

**↓**

**Consequence**

**Therapist redirected student and provided verbal support.**

## **Additional Fields**

* **Date**  
* **Time**  
* **Duration**  
* **Intensity**  
* **Location**  
* **Staff Present**

## **Features**

* **Add incident**  
* **Edit incident**  
* **Filter incidents**  
* **Search history**  
* **Generate reports**

## **Why is ABC important?**

**Over time, therapists can identify patterns.**

**Example:**

**Every time math begins,**

**↓**

**Student throws materials.**

**↓**

**This suggests math activities may be triggering the behavior.**

## **Main Responsibility**

**Frontend**

* **ABC form**

**Backend**

* **Incident database**  
* **Reports**

**Overall**

**✅ Full Stack**

# **MR-35 Session Notes & Attachments**

## **What is it?**

**After every therapy session, therapists write professional notes describing what happened.**

## **Example**

**Today's Summary**

**Emily independently requested toys five times.**

**Eye contact improved.**

**One tantrum occurred during cleanup.**

**Excellent participation overall.**

## **Attachments**

**Therapists can upload:**

* **Photos**  
* **Videos**  
* **PDFs**  
* **Worksheets**  
* **Assessment documents**

## **Rich Text Features**

* **Bullet lists**  
* **Bold**  
* **Italics**  
* **Tables**  
* **Hyperlinks**

## **Features**

* **Create notes**  
* **Edit notes**  
* **Auto-save**  
* **Attach files**  
* **View previous notes**

## **Main Responsibility**

**Frontend**

* **Note editor**

**Backend**

* **File storage**  
* **APIs**

**Overall**

**✅ Full Stack**

# **MR-36 Goal Progress Update**

## **What is it?**

**After a therapy session ends, the student's goals should automatically update based on the data collected.**

## **Example**

**Current Goal**

**Maintain eye contact for 5 seconds.**

**Before today's session**

**Progress**

**55%**

**Today's performance**

**Correct**

**9/10**

**After calculation**

**Progress**

**72%**

## **Automatic Updates**

**The system should:**

* **Update percentages**  
* **Calculate mastery**  
* **Show trends**  
* **Generate progress charts**

## **Example Chart**

**Week 1**

**20%**

**↓**

**Week 2**

**38%**

**↓**

**Week 3**

**55%**

**↓**

**Week 4**

**72%**

**↓**

**Week 5**

**89%**

**↓**

**Mastered**

## **Features**

* **Automatic progress calculation**  
* **Manual adjustment (if authorized)**  
* **Progress history**  
* **Goal completion notifications**

# **6\. Staff Scheduling & Operations (MR-37)**

## **What is this module?**

This module helps the therapy center organize its daily operations.

Instead of using paper schedules or spreadsheets, the system manages:

* Therapist schedules  
* Student appointments  
* Room assignments  
* Attendance  
* Calendar management  
* Daily workload

Think of it as the clinic's **operations center**.

# **Workflow**

Program Director Creates Schedule

            │

            ▼

Assign Therapist

            │

            ▼

Assign Student

            │

            ▼

Reserve Room

            │

            ▼

Therapy Session Happens

            │

            ▼

Attendance Recorded

            │

            ▼

Schedule Updated

# **MR-38 Staff Scheduling Calendar**

## **What is it?**

A calendar where administrators can schedule therapists and therapy sessions.

Instead of manually tracking appointments, everything is shown in one calendar.

## **Calendar Views**

Daily View

Weekly View

Monthly View

Timeline View

## **Example**

Monday

9:00–10:00

Emily

John

10:00–11:00

Michael

Sarah

11:00–12:00

Sophia

John

## **Features**

* Drag and drop appointments  
* Move appointments  
* Resize appointment duration  
* Color-code therapists  
* Color-code therapy types

## **Automatic Conflict Detection**

The system should prevent:

❌ A therapist being scheduled in two places at the same time.

❌ A student having overlapping appointments.

❌ A room being double-booked.

## **Main Responsibility**

Frontend

* Calendar UI

Backend

* Schedule management  
* Conflict checking

Overall

✅ Full Stack

# **MR-39 Appointment & Session Management**

## **What is it?**

Handles all appointments from creation until completion.

## **Features**

Create Appointment

Edit Appointment

Cancel Appointment

Reschedule Appointment

Mark Completed

Mark Missed

## **Example Appointment**

Student

Emily Johnson

Therapist

John Smith

Date

Monday

Time

10:00 AM

Room

Therapy Room 2

---

## **Appointment Status**

Possible statuses:

Scheduled

Confirmed

Checked In

In Progress

Completed

Cancelled

No Show

---

## **Automatic Reminders**

The system should remind:

* Therapists  
* Parents  
* Administrators

before appointments begin.

---

## **Main Responsibility**

Full Stack

---

# **MR-40 Attendance Tracking**

## **What is it?**

Tracks who actually attended therapy sessions.

## **Attendance Types**

Student

Therapist

Support Staff

## **Student Status**

Present

Absent

Late

Excused

## **Therapist Status**

Present

Late

On Leave

Substitute

## **Features**

* One-click attendance  
* Bulk attendance  
* Daily attendance report  
* Monthly attendance report

---

## **Example**

Emily

✔ Present

Michael

❌ Absent

Sophia

Late

## **Why is this important?**

Attendance affects:

* Progress reports  
* Billing (if applicable)  
* Parent communication  
* Therapy consistency

---

## **Main Responsibility**

Frontend

* Attendance screen

Backend

* Store attendance  
* Generate reports

Overall

✅ Full Stack

---

# **MR-41 Room & Resource Scheduling**

## **What is it?**

Manages therapy rooms and shared resources.

Instead of relying on memory, the system keeps track of availability.

---

## **Resources**

Therapy Rooms

Speech Rooms

Sensory Rooms

Assessment Rooms

Equipment

* Tablets  
* Projectors  
* Therapy Kits  
* Sensory Toys

---

## **Example**

Room 2

Reserved

10:00–11:00

Emily

---

## **Features**

Reserve Room

Release Room

Reserve Equipment

Maintenance Schedule

Room Availability

## **Conflict Prevention**

The system should not allow:

Room 1

10:00–11:00

Emily

AND

Michael

at the same time.

---

## **Main Responsibility**

Full Stack

# **MR-42 Therapist Workload Dashboard**

## **What is it?**

A dashboard showing each therapist's workload.

This helps managers distribute work fairly and avoid overbooking.

## **Dashboard Displays**

Number of students

Today's sessions

Weekly sessions

Hours worked

Goals managed

Pending reports

---

## **Example**

John Smith

Students

18

Today's Sessions

6

Hours

7

Pending Notes

2

---

## **Charts**

Workload by therapist

Hours per week

Session completion

Attendance rate

---

## **Benefits**

Managers can quickly see if one therapist has too many sessions while another has capacity.

---

## **Main Responsibility**

Frontend

* Dashboard  
* Graphs

Backend

* Analytics  
* Statistics

Overall

✅ Full Stack

---

# **How These Tasks Work Together**

Administrator Opens Calendar

          │

          ▼

Schedules Therapist

          │

          ▼

Assigns Student

          │

          ▼

Reserves Room

          │

          ▼

Session Conducted

          │

          ▼

Attendance Recorded

          │

          ▼

Dashboard Updated

Everything stays synchronized so everyone knows where they need to be and when.

# **7\. Reporting & Oversight (MR-43)**

## **What is this module?**

This module generates reports and dashboards to help monitor:

* Student progress  
* Therapist performance  
* Assessment outcomes  
* Attendance  
* Behavior trends  
* Clinic performance

Instead of manually counting or reviewing records, the system automatically summarizes the data.

---

# **Workflow**

Student Data

      │

      ▼

Assessments

      │

      ▼

Therapy Sessions

      │

      ▼

Goal Progress

      │

      ▼

Attendance

      │

      ▼

Generate Reports

      │

      ▼

Review by Therapists & Management

---

# **MR-44 Student Progress Reports**

## **What is it?**

This feature generates a detailed report showing how a student has progressed over time.

Therapists can use these reports during parent meetings or periodic reviews.

---

## **Information Included**

### **Student Information**

* Name  
* Age  
* Diagnosis  
* Assigned Therapist  
* Program

---

### **Goal Progress**

Example:

Communication

████████░░ 80%

Social Skills

██████░░░░ 60%

Self-Care

██████████ 100%

---

### **Therapy Attendance**

Sessions Scheduled

24

Completed

22

Missed

2

---

### **Behavior Summary**

Tantrums

January: 10

February: 6

March: 2

This shows improvement over time.

---

### **Therapist Comments**

Example

Emily is becoming more independent.

Eye contact has improved significantly.

Recommend continuing current intervention.

---

## **Export Options**

* PDF  
* Excel  
* Print

## **Main Responsibility**

Frontend

* Report viewer  
* Charts

Backend

* Generate report  
* Calculate statistics

Overall

✅ Full Stack

# **MR-45 Clinical Analytics Dashboard**

## **What is it?**

A dashboard for administrators and program directors that displays statistics about the entire clinic.

Unlike the Student Progress Report, which focuses on one student, this dashboard provides a high-level overview.

## **Dashboard Cards**

* Total Students  
* Active Therapists  
* Sessions This Week  
* Completed Assessments  
* Active Goals  
* Attendance Rate  
* Behavior Incidents

## **Example**

Students

153

Sessions This Week

487

Attendance Rate

95%

Goals Mastered

318

## **Charts**

Student growth

Goal completion

Assessment completion

Behavior incidents

Therapist productivity

Attendance trends

## **Example Trend**

Behavior Incidents

January

45

↓

February

38

↓

March

27

↓

April

18

This helps managers determine whether interventions are working across the clinic.

---

## **Filters**

The dashboard should allow filtering by:

* Date Range  
* Therapist  
* Program  
* Student  
* Age Group

---

## **Main Responsibility**

Frontend

* Dashboard  
* Charts

Backend

* Analytics  
* Aggregated statistics

Overall

✅ Full Stack

---

# **MR-46 Report Builder & Export**

## **What is it?**

Instead of only using predefined reports, users can create their own custom reports.

This is especially useful for administrators.

---

## **Example**

An administrator wants:

Only students

Who attend ABA

Between ages 5–8

With attendance below 80%.

The system should generate exactly that report.

---

## **Filters**

Student

Therapist

Program

Date

Attendance

Assessment Score

Goal Status

Behavior Type

Diagnosis

---

## **Example Builder**

Program

ABA

Attendance

\<80%

Date

January–March

Generate Report

---

## **Export Formats**

PDF

Excel

CSV

Print

---

## **Why is this useful?**

Managers often have unique reporting needs that standard reports can't cover.

This feature lets them create reports without needing a developer.

---

## **Main Responsibility**

Frontend

* Report builder UI

Backend

* Query generation  
* Export services

Overall

✅ Full Stack

---

# **How These Tasks Work Together**

Assessments

       │

       ▼

Therapy Sessions

       │

       ▼

Goal Progress

       │

       ▼

Attendance

       │

       ▼

Behavior Data

       │

       ▼

Generate Reports

       │

       ▼

Clinic Dashboard

Every module you've learned so far contributes data to this reporting system.

# **8\. Parent Portal & Communication (MR-47)**

## **What is this module?**

The Parent Portal is a secure area where parents or guardians can:

* View their child's progress  
* See upcoming appointments  
* Read therapist notes  
* Receive announcements  
* Communicate with therapists  
* Access reports

Instead of calling the clinic every time they want an update, parents can log in and view the information themselves.

---

# **Workflow**

Therapist Updates Session  
          │  
          ▼  
Goal Progress Updated  
          │  
          ▼  
Report Generated  
          │  
          ▼  
Parent Logs In  
          │  
          ▼  
Views Progress  
          │  
          ▼  
Sends Message if Needed  
---

# **MR-48 Parent Dashboard**

## **What is it?**

This is the homepage parents see after logging in.

It provides a quick overview of their child's information.

---

## **Dashboard Displays**

* Child's Name  
* Assigned Therapist  
* Next Appointment  
* Recent Therapy Sessions  
* Goal Progress  
* Recent Announcements  
* Notifications

---

## **Example**

Emily Johnson

Next Session

Monday  
10:00 AM

Progress

Communication 75%

Social Skills 60%

Attendance

95%  
---

## **Quick Actions**

Parents should be able to:

* View reports  
* Check appointments  
* Message therapist  
* View notifications  
* Download documents

---

## **Main Responsibility**

Frontend

* Dashboard  
* Charts  
* Navigation

Backend

* Parent-specific APIs  
* Authentication

Overall

✅ Full Stack

---

# **MR-49 Parent Messaging**

## **What is it?**

A secure messaging system between parents and clinic staff.

Unlike Telegram or WhatsApp, all communication stays inside the system and becomes part of the student's record if needed.

---

## **Example Conversation**

Parent

Emily has a doctor's appointment tomorrow.

Can we reschedule?

↓

Therapist

Certainly.

I've moved the session to Thursday at 10 AM.  
---

## **Features**

Parents can:

* Send messages  
* Receive replies  
* Attach documents  
* View message history

Therapists can:

* Respond  
* Share updates  
* Send reminders

---

## **Attachments**

Supported files:

* PDF  
* Images  
* Medical documents

---

## **Message Status**

Sent

↓

Delivered

↓

Read

↓

Replied  
---

## **Security**

Parents should only see messages related to **their own child**.

---

## **Main Responsibility**

Frontend

* Chat interface

Backend

* Messaging APIs  
* Notifications  
* File uploads

Overall

✅ Full Stack

---

# **MR-50 Parent Reports & Documents**

## **What is it?**

Allows parents to access documents related to their child.

---

## **Documents**

Progress Reports

Assessment Reports

IUP

Attendance Reports

Therapy Notes (if shared)

Invoices (if applicable)

Consent Forms

---

## **Example**

Documents

Progress Report

March 2026

↓

Download PDF  
---

## **Features**

* Download reports  
* View reports online  
* Search documents  
* Filter by date  
* Secure access

---

## **Permissions**

Parents should **only** have access to their own child's documents.

Administrators decide which documents are visible to parents.

---

## **Main Responsibility**

Frontend

* Document viewer

Backend

* File storage  
* Permissions

Overall

✅ Full Stack

# **MR-51 Announcements & Parent Notifications**

## **What is it?**

Allows the clinic to send announcements to parents.

## **Examples**

* Holiday closure  
* Schedule changes  
* Parent meetings  
* New therapy programs  
* Emergency notices

## **Example**

Announcement

The clinic will be closed on Friday due to a public holiday.

## **Features**

* Mark as read  
* Filter announcements  
* Archive old announcements

## **Main Responsibility**

Frontend

* Announcement page

Backend

* Announcement management  
* Read status

Overall

✅ Full Stack

# **How These Tasks Work Together**

Therapy Session Completed  
          │  
          ▼  
Goal Progress Updated  
          │  
          ▼  
Reports Generated  
          │  
          ▼  
Parent Dashboard Updated  
          │  
          ▼  
Parent Receives Notification  
          │  
          ▼  
Parent Can Message Therapist

This ensures parents stay informed and engaged in their child's therapy journey.

# **Summary**

| Task | Purpose | Main Responsibility |
| ----- | ----- | ----- |
| **MR-47** Parent Portal & Communication | Overall parent access module | Full Stack |
| **MR-48** Parent Dashboard | View child information and progress | Full Stack |
| **MR-49** Parent Messaging | Secure communication between parents and staff | Full Stack |
| **MR-50** Parent Reports & Documents | Access and download reports | Full Stack |
| **MR-51** Announcements & Parent Notifications | Receive clinic updates and alerts | Full Stack |

# **💡 Real-Life Example**

Emily's therapy session ends on Monday:

1. The therapist updates Emily's goals and writes session notes.  
2. A new progress report becomes available.  
3. Emily's parent logs into the Parent Portal and sees:  
   * Her next appointment is on Thursday.  
   * Communication skills have improved from **70% to 75%**.  
   * A new report is ready to view.  
4. The parent downloads the report and sends a message asking about a homework activity.  
5. The therapist replies within the portal, keeping all communication organized and secure.

## **MR-52 – Notifications & Background Sync**

This module powers real-time notifications, offline functionality, and automatic synchronization, ensuring the system works reliably even when internet access is unstable. It's the infrastructure that ties the entire application together.

### **Notification Types**

* **Appointment reminders** - Session start reminders (e.g., "Session at 10:00 AM - Student A · Room 2. Starting soon.")
* **Goal completion notifications** - Notify relevant staff and parents when a goal is mastered or pending approval
* **Assessment notifications** - Assessment completed, IUP draft reminders, and approval requests
* **Coordinator / Director alerts** - Escalations, revision requests, and operational alerts
* **Parent messages** - Incoming message alerts from parents
* **Announcements** - Clinic-wide updates (e.g., public holiday closures)

### **Notification Screens**

| Screen | User Role | Description |
| ------ | --------- | ----------- |
| Teacher Notifications | Teacher / Therapist | Reminders and alerts for the teacher's sessions, goals, and approvals |
| Coordinator Notifications | Therapy Coordinator | Operational alerts, session report revisions, escalations |
| Parent Notifications | Parent / Guardian | Child progress updates, reports available, announcements, messages |
| Notifications List (shared component) | All roles | Scrollable list of notifications with type badge, timestamp, read/unread state, and mark-as-read |

### **Background Sync & Offline**

* Automatic synchronization of pending changes when connectivity is restored
* Offline-first storage of trial logs, ABC incidents, and session data
* Conflict resolution using timestamps; newest write wins by default
* Synchronization status indicator (Synced / Syncing / Offline)

### **Flow: Notification Delivery**

```
Event Recorded (e.g., goal mastered)
        │
        ▼
System Generates Notification
        │
        ▼
Push / In-app Notification Created
        │
        ▼
Recipient Views Notification
        │
        ▼
Mark as Read (optional)
```

