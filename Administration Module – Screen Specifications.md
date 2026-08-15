# **Administration Module - Screen Specifications**

## Administration Panel Overview

| Field       | Value                                             |
| ----------- | ------------------------------------------------- |
| Screen ID   | SCR-ADMIN-000                                     |
| Screen Name | Administration Panel - Overview                   |
| User Role   | Institutional Administrator, System Administrator |
| Platform    | Web / Desktop (Responsive)                        |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Provide a tabbed administration dashboard that separates clinical configuration (Institutional Admin) from system/user configuration (System Admin).

**Pre-Conditions:** User logged in with Institutional Administrator role or System Administrator role.

**Post-Conditions:** User navigates to the desired configuration sub-screen.

### Components & Interaction Details

| Component                         | Type            | Description                                                                                                   | Validation / Behavior                       |
| --------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Header                            | Text            | Administration Panel with Foundation logo                                                                     | Static                                      |
| Clinical Configuration Tab        | Tab Button      | Visible to Institutional Administrators. Contains Forms, Trial Logging, ABC Lists, Schedule, Capacity, Goals, Task Analysis, Clinical Categories, Clinic Info, Working Hours, Schools. | Default active tab for Institutional Admin  |
| System Configuration Tab          | Tab Button      | Visible to System Administrators. Contains Staff, Roles, Permissions, Audit Log.                                                                                                             | Default active tab for System Admin         |
| Clinical Configuration Navigation | Sidebar / Pills | Form Builder, Trial Logging Format, ABC Dropdown Lists, Session Schedule & Capacity, Goal Domain Definitions, Task Analysis Templates, Clinical Categories, Clinic Info, Working Hours, School Settings | Navigates to SCR-ADMIN-001 to SCR-ADMIN-010 |
| System Configuration Navigation   | Sidebar / Pills | Staff Account Management, Role Management, Permission Configuration, Audit Log                                                                                                                   | Navigates to SCR-SYS-001 to SCR-SYS-004     |

# **Institutional Administration**

## **_Screen ID: SCR-ADMIN-001 - Form Builder_**

| Field       | Value                       |
| ----------- | --------------------------- |
| Screen ID   | SCR-ADMIN-001               |
| Screen Name | Form Builder                |
| User Role   | Institutional Administrator |
| Platform    | Web / Desktop               |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Allow configuration of:Enrollment Wizard Form, IUP Form, ABLLS Assessment Form Configuration includes: Uploading a form template, Toggling fields on/off, Editing field labels, Drag-and-drop form building

**Pre-Conditions:** User logged in as Institutional Administrator.

**Post-Conditions:** Configuration is reflected in the live application.

### Components & Interaction Details

| Component                  | Type                 | Description                                                       | Validation / Behavior                                                 |
| -------------------------- | -------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| Form Selector              | Dropdown             | Enrollment Wizard<br><br>IUP Form<br><br>ABLLS Assessment Form    | Required                                                              |
| Upload Template            | Button / File Upload | Upload form structure                                             | Supports JSON/XML                                                     |
| Form Canvas                | Drag-and-Drop Area   | Visual representation of selected form                            | Reorder, Edit, Delete, Show/Hide                                      |
| Add New Field              | Button               | Add custom fields                                                 | Text, Number, Date, Dropdown, Checkbox, Radio, Text Area, File Upload |
| Field Properties Modal     | Modal                | Edit field properties                                             | Label, Placeholder, Required, Help Text, Default Value                |
| Toggle Visibility          | Toggle               | Hide/show field                                                   | Hidden fields retain data                                             |
| Preview Form               | Button               | Read-only preview                                                 | Uses current configuration                                            |
| Save Configuration         | Button               | Save changes                                                      | At least one field required                                           |
| Reset to Default           | Button               | Restore default configuration                                     | Confirmation required                                                 |
| Default Template Indicator | Badge                | Shows whether the current form is using the default configuration | Displays: "Using Default Template" or "Custom Template"               |
| Modification History       | Section              | Shows all changes made to this form                               | Displays: Date, User, Field Name, Old Value, New Value                |

Note:  
ABLLS Assessment Form: The ABLLS form ships with the default skill items as defined in SRS Section 3.3.3. Administrators may:

Add new skill items  
Edit skill item descriptions  
Change the order of items  
Toggle items on/off (hide/show  
Change the scoring type (e.g., add new score options)

Preference Assessment Item Inventory: The Preference Assessment form ships with a default inventory of items as defined in SRS Section 3.3.6. Administrators may:  
Add new items to the inventory  
Edit item names and categories  
Delete items from the inventory  
Reorder items within categories  
Add new categories  
Toggle items on/off (hide/show)  
Reset to default inventory

Sensory Time Engagement Activities: The Sensory Time Engagement form ships with a default inventory of 12 activities as defined in SRS Section 3.3.7. Administrators may:  
Add new activities to the inventory  
Edit activity names and descriptions  
Delete activities from the inventory  
Reorder activities  
Toggle activities on/off (hide/show)  
Reset to default inventory

Add this standard header to all form screens:

Form Header Component (Standard for all forms)

| Component         | Type      | Description                | Validation/Behavior                     |
| ----------------- | --------- | -------------------------- | --------------------------------------- |
| Form Header       | Section   | Displays form metadata     | Always visible at top of form           |
| Form ID           | Read-only | Form identifier            | Auto-populated from admin configuration |
| Form Name         | Read-only | Name of the form           | Auto-populated from admin configuration |
| Revision          | Read-only | Revision number and date   | Auto-populated from admin configuration |
| Page Indicator    | Read-only | Current page / Total pages | Auto-calculated                         |
| Organization Logo | Image     | Foundation logo            | System-wide configuration               |

**_Screen ID: SCR-ADMIN-002 - Trial Logging Format Configuration_**

| Field       | Value                       |
| ----------- | --------------------------- |
| Screen ID   | SCR-ADMIN-002               |
| Screen Name | Trial Logging Format        |
| User Role   | Institutional Administrator |
| Platform    | Web / Desktop               |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Configure: Prompt labels, Button colors, Trial stream layout, Mastery criteria

**Pre-Conditions:** User logged in as Institutional Administrator.

**Post-Conditions:** Changes reflected in SCR-002.

### Components & Interaction Details

| Component                      | Type         | Description                | Validation / Behavior                                |
| ------------------------------ | ------------ | -------------------------- | ---------------------------------------------------- |
| Prompt Level List              | Table        | Existing prompt levels     | Label, Color, Order, Status                          |
| Add Prompt Level               | Button       | Add custom prompt level    | Label must be unique                                 |
| Delete Prompt Level            | Button       | Remove prompt level        | Confirmation required                                |
| Trial Stream Layout            | Radio Group  | Configure layout           | Horizontal, Vertical, Card Grid                      |
| Trial Stream Count             | Number Input | Number of trials displayed | Range 3-20                                           |
| Mastery Criteria Configuration | Section      | Configure mastery rules    | Consecutive trials, percentage, automatic suggestion |
| Live Preview                   | Preview      | Visual representation      | Updates dynamically                                  |
| Save Configuration             | Button       | Save settings              | At least one active prompt level required            |

## **_Screen ID: SCR-ADMIN-003 - ABC Dropdown List Manager_**

| Field       | Value                       |
| ----------- | --------------------------- |
| Screen ID   | SCR-ADMIN-003               |
| Screen Name | ABC Dropdown List Manager   |
| User Role   | Institutional Administrator |
| Platform    | Web / Desktop               |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Manage all dropdown options used in the ABC Data Sheet, including: Behavior Names & Definitions, Antecedent options, Consequence options, Location options, Frequency options (if configurable), Intensity options (if configurable), Category options (if configurable)

**Pre-Conditions:** User logged in as Institutional Administrator.

**Post-Conditions:** Changes reflected in SCR-003 and SCR-003A.

### Components & Interaction Details

| Component              | Type   | Description                   | Validation/Behavior                                                                   |
| ---------------------- | ------ | ----------------------------- | ------------------------------------------------------------------------------------- |
| **List Selector**      | Tabs   | Switch between lists          | Behaviors, Antecedents, Consequences, Locations, Frequencies, Intensities, Categories |
| **Behavior List**      | Table  | Existing behavior definitions | Columns: Behavior Name, Definition, Default Category, Status, Actions                 |
| **Add Behavior**       | Button | Add a new behavior            | Behavior Name (required), Definition (required), Category (required)                  |
| **Edit Behavior**      | Button | Edit existing behavior        | Can edit Name, Definition, Category                                                   |
| **Delete Behavior**    | Button | Remove behavior               | Confirmation required. Cannot delete if in use                                        |
| **Antecedent List**    | Table  | Existing antecedent options   | Columns: Antecedent Name, Type (Dropdown/Text), Status, Actions                       |
| **Add Antecedent**     | Button | Add a new antecedent          | Antecedent Name (required), Type (Dropdown or Text with Other)                        |
| **Consequence List**   | Table  | Existing consequence options  | Same structure as Antecedent                                                          |
| **Location List**      | Table  | Existing location options     | Columns: Location Name, Status, Actions                                               |
| **Frequency List**     | Table  | Existing frequency options    | Columns: Frequency Name (Rarely, Occasionally, Frequently, Very Frequently, Constantly), Status, Actions |
| **Intensity List**     | Table  | Existing intensity options    | Columns: Intensity Name (Mild, Moderate, Severe), Status, Actions                     |
| **Category List**      | Table  | Existing category options     | Columns: Category Name, Status, Actions                                               |
| **Save Configuration** | Button | Save all changes              | At least one active option required per list                                          |
| **Reset to Default**   | Button | Restore default options       | Confirmation required                                                                 |

## **_Screen ID: SCR-ADMIN-004 - Session Schedule & Capacity Configuration_**

| Field       | Value                       |
| ----------- | --------------------------- |
| Screen ID   | SCR-ADMIN-004               |
| Screen Name | Session Schedule & Capacity |
| User Role   | Institutional Administrator |
| Platform    | Web / Desktop               |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Configure: Session times, Therapy block duration, Staff-to-student capacity, Draft expiry period

**Pre-Conditions:** User logged in as Institutional Administrator.

**Post-Conditions:** Changes reflected in SCR-002 and SCR-008.

### Components & Interaction Details

| Component                 | Type         | Description                  | Validation / Behavior      |
| ------------------------- | ------------ | ---------------------------- | -------------------------- |
| Session Schedule Section  | Section      | Time-based settings          | Collapsible                |
| Morning Round Start       | Time Picker  | Morning start time           | Default 8:07 AM            |
| Morning Round End         | Time Picker  | Morning end time             | Must be greater than start |
| Afternoon Round Start     | Time Picker  | Afternoon start time         | Default 1:10 PM            |
| Afternoon Round End       | Time Picker  | Afternoon end time           | Must be greater than start |
| Pre-Therapy Duration      | Number Input | Duration in minutes          | Default 30                 |
| Staff-to-Student Capacity | Number Input | Maximum students per teacher | Minimum 1                  |
| Draft Expiry Period       | Number Input | Draft notification period    | Range 1-30 days            |
| Session Block Definitions | Table        | Define custom blocks         | Editable                   |
| Save Configuration        | Button       | Save settings                | Validates time fields      |

## **_Screen ID: SCR-ADMIN-005 - Goal Domain Definitions_**

| Field       | Value                       |
| ----------- | --------------------------- |
| Screen ID   | SCR-ADMIN-005               |
| Screen Name | Goal Domain Definitions     |
| User Role   | Institutional Administrator |
| Platform    | Web / Desktop               |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Manage goal domains used by the Goal Bank.

**Pre-Conditions:** User logged in as Institutional Administrator.

**Post-Conditions:** Changes reflected in SCR-007.

### Components & Interaction Details

| Component          | Type   | Description      | Validation / Behavior               |
| ------------------ | ------ | ---------------- | ----------------------------------- |
| Domain List        | Table  | Existing domains | Name, Description, Order, Status    |
| Add Domain         | Button | Add new domain   | Unique name required                |
| Delete Domain      | Button | Delete domain    | Confirmation required               |
| Save Configuration | Button | Save changes     | At least one active domain required |

**_SCR-ADMIN-006: Task Analysis Templates_**

Screen ID: SCR-ADMIN-006

Screen Name: Task Analysis Templates

User Role: Institutional Administrator

Platform: Web / Desktop

Purpose: Manage task analysis templates used for multi-step goals.

Component Details:

| Component        | Type             | Description                         | Validation/Behavior                                  |
| ---------------- | ---------------- | ----------------------------------- | ---------------------------------------------------- |
| Template List    | Table            | Displays existing templates         | Columns: Template Name, Steps Count, Status, Actions |
| Add Template     | Button           | Create a new task analysis template | Opens template editor                                |
| Template Editor  | Modal/Form       | Create/edit template                | Fields: Template Name, Description, Steps List       |
| Step Manager     | Reorderable List | Manage steps in the template        | Add, edit, delete, reorder steps                     |
| Add Step         | Button           | Add a new step                      | Step Description required                            |
| Edit Step        | Button           | Edit step description               | Text input                                           |
| Delete Step      | Button           | Remove step                         | Confirmation required                                |
| Mastery Criteria | Section          | Configure mastery criteria          | Per-step and overall criteria                        |
| Save Template    | Button           | Save template                       | At least one step required                           |
| Delete Template  | Button           | Delete template                     | Confirmation required. Cannot delete if in use       |

## **_Screen ID: SCR-ADMIN-007 - Clinical Categories_**

| Field       | Value                       |
| ----------- | --------------------------- |
| Screen ID   | SCR-ADMIN-007               |
| Screen Name | Clinical Categories         |
| User Role   | Institutional Administrator |
| Platform    | Web / Desktop               |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Manage the clinical configuration lists used throughout the application: Programs (e.g., ABA, Speech, Occupational Therapy), Assessment Types (e.g., VB-MAPP, ABLLS-R), and Therapy Types (e.g., 1:1 ABA Session, Speech Language Therapy, Group Social Skills, Parent Training).

**Pre-Conditions:** User logged in as Institutional Administrator.

**Post-Conditions:** Changes reflected in enrollment, assessment, and scheduling selection lists.

### Components & Interaction Details

| Component       | Type          | Description                              | Validation / Behavior                     |
| --------------- | ------------- | ---------------------------------------- | ----------------------------------------- |
| Section Tabs    | Tabs          | Switch between category lists            | Programs, Assessment Types, Therapy Types |
| Category List   | List          | Existing entries                         | Name and Active/Inactive status           |
| Add Item        | Text Input    | Add a new entry                          | Name required                             |
| Rename Item     | Text Input    | Edit an entry's name                     | Name required                             |
| Toggle Active   | Toggle        | Activate/deactivate an entry             | Inactive entries hidden from selection    |
| Delete Item     | Button        | Remove an entry                          | Confirmation required                     |

## **_Screen ID: SCR-ADMIN-008 - Clinic Info_**

| Field       | Value                       |
| ----------- | --------------------------- |
| Screen ID   | SCR-ADMIN-008               |
| Screen Name | Clinic Info                 |
| User Role   | Institutional Administrator |
| Platform    | Web / Desktop               |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Configure organization-level information used on forms and system-wide headers: organization name, address, contact details, and director.

**Pre-Conditions:** User logged in as Institutional Administrator.

**Post-Conditions:** Updated details reflected in the Organization Logo / Form Header component and contact records.

### Components & Interaction Details

| Component     | Type      | Description             | Validation / Behavior      |
| ------------- | --------- | ----------------------- | -------------------------- |
| Clinic Name   | Text Input| Organization name       | Required                   |
| Address       | Text Area | Physical address        | Free text                  |
| City          | Text Input| City                    | Free text                  |
| Phone         | Tel Input | Contact number          | Format validation         |
| Email         | Text Input| Contact email           | Email format validation   |
| Director      | Text Input| Organization director   | Free text                  |
| Save Changes  | Button    | Persist settings        | Confirmation on success   |

## **_Screen ID: SCR-ADMIN-009 - Working Hours_**

| Field       | Value                       |
| ----------- | --------------------------- |
| Screen ID   | SCR-ADMIN-009               |
| Screen Name | Working Hours               |
| User Role   | Institutional Administrator |
| Platform    | Web / Desktop               |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Configure institution working hours and availability windows on a per-day basis.

**Pre-Conditions:** User logged in as Institutional Administrator.

**Post-Conditions:** Availability windows reflected in scheduling screens (SCR-TC-005, SCR-DIR-002).

### Components & Interaction Details

| Component       | Type         | Description                 | Validation / Behavior     |
| --------------- | ------------ | --------------------------- | ------------------------- |
| Day Row         | List         | One row per day             | Monday through Sunday     |
| Open Time       | Time Input   | Start of day                | HH:MM format              |
| Close Time      | Time Input   | End of day                  | Must be after Open Time   |
| Closed Toggle   | Toggle       | Mark a day as closed        | Overrides time values     |
| Save Changes    | Button       | Persist settings            | Confirmation on success   |

## **_Screen ID: SCR-ADMIN-010 - School Settings_**

| Field       | Value                       |
| ----------- | --------------------------- |
| Screen ID   | SCR-ADMIN-010               |
| Screen Name | School Settings             |
| User Role   | Institutional Administrator |
| Platform    | Web / Desktop               |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Configure affiliated school and site-level settings: school name, current term, academic year, and default session/capacity values.

**Pre-Conditions:** User logged in as Institutional Administrator.

**Post-Conditions:** Defaults applied when new sessions and capacity rules are created.

### Components & Interaction Details

| Component                    | Type         | Description                    | Validation / Behavior     |
| ---------------------------- | ------------ | ------------------------------ | ------------------------- |
| School Name                  | Text Input   | Affiliated school name         | Required                  |
| Current Term                 | Text Input   | Term label                     | Free text                 |
| Academic Year                | Text Input   | Year label                     | Free text                 |
| Session Length               | Number Input | Minutes per session            | Must be greater than 0    |
| Default Students Per Session | Number Input | Default capacity per session   | Minimum 1                 |
| Max Students Per Therapist   | Number Input | Upper capacity bound           | Must be >= Default       |
| Save Changes                 | Button       | Persist settings               | Confirmation on success   |

# **System Administration**

## **_Screen ID: SCR-SYS-001 - Staff Account Management_**

| Field       | Value                    |
| ----------- | ------------------------ |
| Screen ID   | SCR-SYS-001              |
| Screen Name | Staff Account Management |
| User Role   | System Administrator     |
| Platform    | Web / Desktop            |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Manage staff accounts, including creation, editing, activation, deactivation, and password reset.

**Pre-Conditions:** User logged in as System Administrator.

**Post-Conditions:** Changes reflected immediately in authentication and role assignments.

### Components & Interaction Details

| Component                    | Type                | Description               | Validation / Behavior               |
| ---------------------------- | ------------------- | ------------------------- | ----------------------------------- |
| Search Bar                   | Text Input          | Search by name or email   | Real-time filtering                 |
| Role Filter                  | Dropdown            | Filter by role            | Default: All                        |
| Status Filter                | Dropdown            | Filter by status          | Default: All                        |
| Add Staff Button             | Button              | Create staff account      | System Admin only                   |
| Staff List                   | Table               | List staff accounts       | Name, Email, Roles, Status, Actions |
| Staff Details Form           | Modal               | Staff profile management  | Name, Email, Phone, Roles, Status   |
| Save Changes Button          | Button              | Save profile changes      | Unique email validation             |
| Reset Password Button        | Button              | Send password reset email | Confirmation required               |
| Activate / Deactivate Button | Button              | Toggle account status     | Inactive users cannot log in        |
| Cancel Button                | Button              | Discard changes           | Warn on unsaved changes             |
| Bulk Actions                 | Checkbox + Dropdown | Bulk operations           | Optional                            |

## **_Screen ID: SCR-SYS-002 - Role Management_**

| Field       | Value                |
| ----------- | -------------------- |
| Screen ID   | SCR-SYS-002          |
| Screen Name | Role Management      |
| User Role   | System Administrator |
| Platform    | Web / Desktop        |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Manage available system roles.

**Pre-Conditions:** User logged in as System Administrator.

**Post-Conditions:** Roles available for assignment and permission mapping.

### Components & Interaction Details

| Component             | Type   | Description        | Validation / Behavior                   |
| --------------------- | ------ | ------------------ | --------------------------------------- |
| Role List             | Table  | Existing roles     | Name, Description, Staff Count, Actions |
| Add Role Button       | Button | Create role        | System Admin only                       |
| Role Details Form     | Modal  | Create/Edit role   | Role Name, Description                  |
| Delete Role Button    | Button | Delete role        | Cannot delete assigned roles            |
| Save Changes Button   | Button | Save role          | Unique name validation                  |
| System Role Indicator | Badge  | Marks system roles | Cannot be deleted                       |

## **_Screen ID: SCR-SYS-003 - Permission Configuration (RBAC)_**

| Field       | Value                           |
| ----------- | ------------------------------- |
| Screen ID   | SCR-SYS-003                     |
| Screen Name | Permission Configuration (RBAC) |
| User Role   | System Administrator            |
| Platform    | Web / Desktop                   |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Configure role-based permissions using CRUD + Approve actions.

Permissions are additive for users with multiple roles.

**Pre-Conditions:** User logged in as System Administrator. At least one role exists.

**Post-Conditions:** Permission changes enforced at UI and API levels.

### Components & Interaction Details

| Component           | Type         | Description                | Validation / Behavior      |
| ------------------- | ------------ | -------------------------- | -------------------------- |
| Role Selector       | Dropdown     | Select role                | Populated from SCR-SYS-002 |
| Permission Matrix   | Grid         | Modules vs Actions         | CRUD + Approve             |
| Permission Checkbox | Checkbox     | Permission assignment      | Checked = Granted          |
| Select All (Module) | Checkbox     | All permissions for module | Row toggle                 |
| Select All (Action) | Checkbox     | Action across modules      | Column toggle              |
| Preset Templates    | Buttons      | Default and copy templates | Reset or copy              |
| Live Preview        | Text Summary | Human-readable permissions | Updates dynamically        |
| Save Configuration  | Button       | Save permissions           | Immediate effect           |
| Audit Trail Link    | Link         | Permission change log      | View history               |

### Permission Matrix

<div class="joplin-table-wrapper"><table><tbody><tr><th><p><strong>Modules</strong></p><ul><li>Students - Enrollment</li><li>Assessments</li><li>IUP &amp; Goals</li><li>Active Therapy</li><li>Reports</li><li>Staff</li><li>Admin</li></ul></th><th><p><strong>Actions</strong></p><ul><li>View</li><li>Create</li><li>Edit</li><li>Delete</li><li>Approve</li></ul></th></tr></tbody></table></div>

## **_Screen ID: SCR-SYS-004 - Audit Log_**

| Field       | Value                |
| ----------- | -------------------- |
| Screen ID   | SCR-SYS-004          |
| Screen Name | Audit Log            |
| User Role   | System Administrator |
| Platform    | Web / Desktop        |

### Purpose, Pre-Conditions & Post-Conditions

**Purpose:** Provide a chronological, filterable record of every tracked user action and configuration change: user, action, date/time, resource, and old/new value.

**Pre-Conditions:** User logged in as System Administrator.

**Post-Conditions:** Log entries are reviewable; no data is modified.

### Components & Interaction Details

| Component         | Type         | Description                          | Validation / Behavior                                        |
| ----------------- | ------------ | ------------------------------------ | ------------------------------------------------------------ |
| Search Bar        | Text Input   | Search by user or resource           | Real-time filtering                                          |
| User Filter       | Chips        | Filter by user                       | Options: All or individual users                             |
| Action Filter     | Chips        | Filter by action type                | Options: All, Created, Updated, Deleted, Changed             |
| Log Entry List    | Scrollable   | Displays tracked actions             | Each entry: User, Action badge, Date/Time, Resource, IP      |
| Old / New Value   | Read-only    | Shows the value change               | Displayed when a change is recorded                          |
| Empty State       | Text         | No entries match filters             | Shown when filters return no results                         |