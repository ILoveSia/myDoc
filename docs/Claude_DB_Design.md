# ���� å�������� ���� �ý��� DB ���輭

## 1. ����

### 1.1 ����
�� ������ ���� å�������� ���� �ý����� �����ͺ��̽� ���踦 �����Ѵ�. �ý����� �䱸������ ȿ�������� �����ϱ� ���� �����ͺ��̽� ����, ���̺�, �ʵ�, ���� ���� ���� ����Ѵ�.

### 1.2 ����
- å������ ���� ������
- �������� ���� ������
- ���� ���� ������
- ���� ���� ������
- �ý��� ���� ������

### 1.3 ���� ����
- ���� å�������� ���� �ý��� �䱸���� ���Ǽ�

## 2. �����ͺ��̽� ����

### 2.1 �����ͺ��̽� ����
- **DBMS**: ������ �����ͺ��̽�(RDBMS)
- **���� ���ڵ�**: UTF-8
- **�ֿ� ����**:
  - ����/�λ� ���� ����
  - å�� ���� ����
  - �������� ���� ����
  - ���� ���� ����
  - ���� ���� ����
  - �ý��� ���� ����

### 2.2 ���� ������ �� (ERD)
���� å�������� ���� �ý����� �ֿ� ��ƼƼ�� ����� ������ ����:

- ����(Organization) �� �ӿ�/�μ���(Executive) : 1:N ����
- �ӿ�/�μ���(Executive) �� å��(Duty) : N:M ���� (ExecutiveDuty �߰� ���̺�)
- å��(Duty) �� å�������(DutyDescription) : 1:N ����
- å��(Duty) �� ���������Ŵ���(ControlManual) : 1:N ����
- �μ�(Department) �� ��������Ȱ��(ControlActivity) : 1:N ����
- ��������Ȱ��(ControlActivity) �� ��������(Inspection) : 1:N ����
- ��������(Inspection) �� �������(Improvement) : 1:N ����
- ����(Document) �� ����(Approval) : 1:N ����
- �����(User) �� ����(Role) : N:M ���� (UserRole �߰� ���̺�)

## 3. ���̺� ����

### 3.1 ����/�λ� ���� ����

#### 3.1.1 Organization (���� ���̺�)
���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| org_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| org_name | VARCHAR | 100 | NO | - | ������ | - |
| org_type | VARCHAR | 20 | NO | - | ���� ���� (����, �μ�, �� ��) | - |
| parent_org_id | VARCHAR | 20 | YES | NULL | ���� ���� ID | FK(Organization) |
| org_level | INT | - | NO | 0 | ���� ���� | - |
| description | VARCHAR | 500 | YES | NULL | ���� ���� | - |
| effective_date | DATE | - | NO | - | ������ | - |
| expiry_date | DATE | - | YES | NULL | ������ | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Organization: org_id (Primary Key)
- IX_Organization_Parent: parent_org_id (Foreign Key)
- IX_Organization_Name: org_name

#### 3.1.2 Department (�μ� ���̺�)
�μ� �� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| dept_id | VARCHAR | 20 | NO | - | �μ� ID | PK |
| org_id | VARCHAR | 20 | NO | - | ���� ID | FK(Organization) |
| dept_code | VARCHAR | 20 | NO | - | �μ� �ڵ� | - |
| dept_name | VARCHAR | 100 | NO | - | �μ��� | - |
| dept_head_id | VARCHAR | 20 | YES | NULL | �μ��� ID | FK(Executive) |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Department: dept_id (Primary Key)
- FK_Department_Organization: org_id (Foreign Key)
- FK_Department_Executive: dept_head_id (Foreign Key)
- IX_Department_Code: dept_code

#### 3.1.3 Executive (�ӿ�/�μ��� ���̺�)
�ӿ� �� �μ��� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| executive_id | VARCHAR | 20 | NO | - | �ӿ�/�μ��� ID | PK |
| user_id | VARCHAR | 20 | NO | - | ����� ID | FK(User) |
| org_id | VARCHAR | 20 | NO | - | �Ҽ� ���� ID | FK(Organization) |
| position | VARCHAR | 50 | NO | - | ���� | - |
| title | VARCHAR | 50 | YES | NULL | ��å | - |
| executive_type | VARCHAR | 20 | NO | - | �ӿ� ���� (�ӿ�/�μ���) | - |
| appointed_date | DATE | - | NO | - | �Ӹ��� | - |
| resigned_date | DATE | - | YES | NULL | ������ | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Executive: executive_id (Primary Key)
- FK_Executive_User: user_id (Foreign Key)
- FK_Executive_Organization: org_id (Foreign Key)
- IX_Executive_Position: position
- IX_Executive_Type: executive_type

#### 3.1.4 Committee (����ü ���̺�)
����ü ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| committee_id | VARCHAR | 20 | NO | - | ����ü ID | PK |
| committee_name | VARCHAR | 100 | NO | - | ����ü�� | - |
| committee_type | VARCHAR | 50 | NO | - | ����ü ���� | - |
| description | VARCHAR | 500 | YES | NULL | ����ü ���� | - |
| chair_executive_id | VARCHAR | 20 | YES | NULL | ���� �ӿ� ID | FK(Executive) |
| established_date | DATE | - | NO | - | ������ | - |
| disbanded_date | DATE | - | YES | NULL | �ػ��� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Committee: committee_id (Primary Key)
- FK_Committee_Executive: chair_executive_id (Foreign Key)
- IX_Committee_Name: committee_name

#### 3.1.5 CommitteeMember (����ü ������ ���̺�)
����ü ������ ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| committee_member_id | VARCHAR | 20 | NO | - | ����ü ������ ID | PK |
| committee_id | VARCHAR | 20 | NO | - | ����ü ID | FK(Committee) |
| executive_id | VARCHAR | 20 | NO | - | �ӿ� ID | FK(Executive) |
| role | VARCHAR | 50 | YES | NULL | ���� | - |
| joined_date | DATE | - | NO | - | ������ | - |
| left_date | DATE | - | YES | NULL | Ż���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_CommitteeMember: committee_member_id (Primary Key)
- FK_CommitteeMember_Committee: committee_id (Foreign Key)
- FK_CommitteeMember_Executive: executive_id (Foreign Key)
- UX_CommitteeMember_Unique: committee_id, executive_id (Unique)

### 3.2 å�� ���� ����

#### 3.2.1 Duty (å�� ���̺�)
å�� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| duty_id | VARCHAR | 20 | NO | - | å�� ID | PK |
| duty_code | VARCHAR | 50 | NO | - | å�� �ڵ� | - |
| duty_name | VARCHAR | 200 | NO | - | å���� | - |
| duty_type | VARCHAR | 50 | NO | - | å�� ���� | - |
| description | TEXT | - | YES | NULL | å�� ���� | - |
| parent_duty_id | VARCHAR | 20 | YES | NULL | ���� å�� ID | FK(Duty) |
| duty_level | INT | - | NO | 0 | å�� ���� | - |
| priority | INT | - | YES | NULL | �켱���� | - |
| reg_basis | VARCHAR | 500 | YES | NULL | ���� �ٰ� | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Duty: duty_id (Primary Key)
- FK_Duty_ParentDuty: parent_duty_id (Foreign Key)
- IX_Duty_Code: duty_code
- IX_Duty_Name: duty_name
- IX_Duty_Type: duty_type

#### 3.2.2 DutyDescription (å������� ���̺�)
å������� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| duty_desc_id | VARCHAR | 20 | NO | - | å������� ID | PK |
| duty_id | VARCHAR | 20 | NO | - | å�� ID | FK(Duty) |
| executive_id | VARCHAR | 20 | YES | NULL | �ӿ� ID | FK(Executive) |
| title | VARCHAR | 200 | NO | - | ���� | - |
| content | TEXT | - | NO | - | ���� | - |
| responsibilities | TEXT | - | YES | NULL | å�ӻ��� | - |
| authority | TEXT | - | YES | NULL | ���� | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| effective_date | DATE | - | NO | - | ������ | - |
| expiry_date | DATE | - | YES | NULL | ������ | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | ���� (�ʾ�/����/���) | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_DutyDescription: duty_desc_id (Primary Key)
- FK_DutyDescription_Duty: duty_id (Foreign Key)
- FK_DutyDescription_Executive: executive_id (Foreign Key)
- IX_DutyDescription_Title: title
- IX_DutyDescription_Status: status

#### 3.2.3 ExecutiveDuty (�ӿ�-å�� ���� ���̺�)
�ӿ��� å�� ���� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| exec_duty_id | VARCHAR | 20 | NO | - | �ӿ�-å�� ���� ID | PK |
| executive_id | VARCHAR | 20 | NO | - | �ӿ� ID | FK(Executive) |
| duty_id | VARCHAR | 20 | NO | - | å�� ID | FK(Duty) |
| assign_date | DATE | - | NO | - | �Ҵ��� | - |
| release_date | DATE | - | YES | NULL | ������ | - |
| is_primary | BOOLEAN | - | NO | FALSE | �ֿ� å�� ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ExecutiveDuty: exec_duty_id (Primary Key)
- FK_ExecutiveDuty_Executive: executive_id (Foreign Key)
- FK_ExecutiveDuty_Duty: duty_id (Foreign Key)
- UX_ExecutiveDuty_Unique: executive_id, duty_id (Unique)

#### 3.2.4 DutyOrganization (å��-���� ���� ���̺�)
å���� ���� ���� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| duty_org_id | VARCHAR | 20 | NO | - | å��-���� ���� ID | PK |
| duty_id | VARCHAR | 20 | NO | - | å�� ID | FK(Duty) |
| org_id | VARCHAR | 20 | NO | - | ���� ID | FK(Organization) |
| assign_date | DATE | - | NO | - | �Ҵ��� | - |
| release_date | DATE | - | YES | NULL | ������ | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_DutyOrganization: duty_org_id (Primary Key)
- FK_DutyOrganization_Duty: duty_id (Foreign Key)
- FK_DutyOrganization_Organization: org_id (Foreign Key)
- UX_DutyOrganization_Unique: duty_id, org_id (Unique)

#### 3.2.5 ControlManual (�������� �Ŵ��� ���̺�)
�������� �����Ŵ��� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| manual_id | VARCHAR | 20 | NO | - | �Ŵ��� ID | PK |
| dept_id | VARCHAR | 20 | NO | - | �μ� ID | FK(Department) |
| duty_id | VARCHAR | 20 | YES | NULL | ���� å�� ID | FK(Duty) |
| manual_type | VARCHAR | 20 | NO | - | �Ŵ��� ���� (����/�μ���) | - |
| title | VARCHAR | 200 | NO | - | ���� | - |
| content | TEXT | - | NO | - | ���� | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| effective_date | DATE | - | NO | - | ������ | - |
| expiry_date | DATE | - | YES | NULL | ������ | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | ���� (�ʾ�/����/���) | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ControlManual: manual_id (Primary Key)
- FK_ControlManual_Department: dept_id (Foreign Key)
- FK_ControlManual_Duty: duty_id (Foreign Key)
- IX_ControlManual_Title: title
- IX_ControlManual_Type: manual_type
- IX_ControlManual_Status: status

### 3.3 �������� ���� ����

#### 3.3.1 ControlActivity (��������Ȱ�� ���̺�)
��������Ȱ�� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| activity_id | VARCHAR | 20 | NO | - | Ȱ�� ID | PK |
| dept_id | VARCHAR | 20 | NO | - | �μ� ID | FK(Department) |
| manual_id | VARCHAR | 20 | YES | NULL | ���� �Ŵ��� ID | FK(ControlManual) |
| activity_name | VARCHAR | 200 | NO | - | Ȱ���� | - |
| description | TEXT | - | YES | NULL | Ȱ�� ���� | - |
| activity_type | VARCHAR | 20 | NO | - | Ȱ�� ���� | - |
| start_date | DATE | - | NO | - | ������ | - |
| end_date | DATE | - | YES | NULL | ������ | - |
| status | VARCHAR | 20 | NO | 'PLANNED' | ���� (��ȹ/����/�Ϸ�) | - |
| responsible_user_id | VARCHAR | 20 | NO | - | ����� ID | FK(User) |
| approved_by | VARCHAR | 20 | YES | NULL | ������ ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | �����Ͻ� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ControlActivity: activity_id (Primary Key)
- FK_ControlActivity_Department: dept_id (Foreign Key)
- FK_ControlActivity_ControlManual: manual_id (Foreign Key)
- FK_ControlActivity_User_Responsible: responsible_user_id (Foreign Key)
- FK_ControlActivity_User_Approver: approved_by (Foreign Key)
- IX_ControlActivity_Status: status

#### 3.3.2 Checklist (üũ����Ʈ ���̺�)
�������� üũ����Ʈ ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| checklist_id | VARCHAR | 20 | NO | - | üũ����Ʈ ID | PK |
| manual_id | VARCHAR | 20 | YES | NULL | ���� �Ŵ��� ID | FK(ControlManual) |
| checklist_name | VARCHAR | 200 | NO | - | üũ����Ʈ�� | - |
| description | TEXT | - | YES | NULL | ���� | - |
| checklist_type | VARCHAR | 20 | NO | - | üũ����Ʈ ���� | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Checklist: checklist_id (Primary Key)
- FK_Checklist_ControlManual: manual_id (Foreign Key)
- IX_Checklist_Name: checklist_name
- IX_Checklist_Type: checklist_type

#### 3.3.3 ChecklistItem (üũ����Ʈ �׸� ���̺�)
üũ����Ʈ �׸� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| item_id | VARCHAR | 20 | NO | - | �׸� ID | PK |
| checklist_id | VARCHAR | 20 | NO | - | üũ����Ʈ ID | FK(Checklist) |
| item_no | INT | - | NO | - | �׸� ��ȣ | - |
| content | TEXT | - | NO | - | �׸� ���� | - |
| item_type | VARCHAR | 20 | NO | - | �׸� ���� | - |
| is_required | BOOLEAN | - | NO | TRUE | �ʼ� ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ChecklistItem: item_id (Primary Key)
- FK_ChecklistItem_Checklist: checklist_id (Foreign Key)
- IX_ChecklistItem_No: checklist_id, item_no

#### 3.3.4 Inspection (�������� ���̺�)
�������� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| inspection_id | VARCHAR | 20 | NO | - | �������� ID | PK |
| dept_id | VARCHAR | 20 | NO | - | �μ� ID | FK(Department) |
| checklist_id | VARCHAR | 20 | NO | - | üũ����Ʈ ID | FK(Checklist) |
| activity_id | VARCHAR | 20 | YES | NULL | ���� Ȱ�� ID | FK(ControlActivity) |
| inspection_name | VARCHAR | 200 | NO | - | �������˸� | - |
| description | TEXT | - | YES | NULL | ���� | - |
| inspection_type | VARCHAR | 20 | NO | - | �������� ���� | - |
| inspection_date | DATE | - | NO | - | ������ | - |
| status | VARCHAR | 20 | NO | 'PLANNED' | ���� (��ȹ/����/�Ϸ�) | - |
| inspector_id | VARCHAR | 20 | NO | - | ������ ID | FK(User) |
| reviewer_id | VARCHAR | 20 | YES | NULL | ������ ID | FK(User) |
| reviewed_at | DATETIME | - | YES | NULL | �����Ͻ� | - |
| approver_id | VARCHAR | 20 | YES | NULL | ������ ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | �����Ͻ� | - |
| result | VARCHAR | 20 | YES | NULL | ��� (����/������) | - |
| comment | TEXT | - | YES | NULL | �ڸ�Ʈ | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Inspection: inspection_id (Primary Key)
- FK_Inspection_Department: dept_id (Foreign Key)
- FK_Inspection_Checklist: checklist_id (Foreign Key)
- FK_Inspection_ControlActivity: activity_id (Foreign Key)
- FK_Inspection_User_Inspector: inspector_id (Foreign Key)
- FK_Inspection_User_Reviewer: reviewer_id (Foreign Key)
- FK_Inspection_User_Approver: approver_id (Foreign Key)
- IX_Inspection_Date: inspection_date
- IX_Inspection_Status: status

#### 3.3.5 InspectionDetail (�������� �� ���̺�)
�������� �׸� ����� �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| inspection_detail_id | VARCHAR | 20 | NO | - | �������� �� ID | PK |
| inspection_id | VARCHAR | 20 | NO | - | �������� ID | FK(Inspection) |
| item_id | VARCHAR | 20 | NO | - | üũ����Ʈ �׸� ID | FK(ChecklistItem) |
| result | VARCHAR | 20 | NO | - | ��� (����/������/�ش����) | - |
| evidence | TEXT | - | YES | NULL | �������� | - |
| comment | TEXT | - | YES | NULL | �ڸ�Ʈ | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_InspectionDetail: inspection_detail_id (Primary Key)
- FK_InspectionDetail_Inspection: inspection_id (Foreign Key)
- FK_InspectionDetail_ChecklistItem: item_id (Foreign Key)
- IX_InspectionDetail_Result: result

#### 3.3.6 Improvement (�������/������ȹ ���̺�)
������� �� ������ȹ ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| improvement_id | VARCHAR | 20 | NO | - | ������ȹ ID | PK |
| inspection_id | VARCHAR | 20 | NO | - | �������� ID | FK(Inspection) |
| inspection_detail_id | VARCHAR | 20 | YES | NULL | �������� �� ID | FK(InspectionDetail) |
| issue_description | TEXT | - | NO | - | ������� ���� | - |
| cause | TEXT | - | YES | NULL | ���� | - |
| improvement_plan | TEXT | - | YES | NULL | ������ȹ | - |
| status | VARCHAR | 20 | NO | 'OPEN' | ���� (����/����/�Ϸ�) | - |
| priority | VARCHAR | 20 | NO | 'MEDIUM' | �켱���� (��/��/��) | - |
| due_date | DATE | - | YES | NULL | �ϷΌ���� | - |
| responsible_user_id | VARCHAR | 20 | NO | - | ����� ID | FK(User) |
| completed_date | DATE | - | YES | NULL | �Ϸ��� | - |
| verification_date | DATE | - | YES | NULL | ������ | - |
| verified_by | VARCHAR | 20 | YES | NULL | ������ ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Improvement: improvement_id (Primary Key)
- FK_Improvement_Inspection: inspection_id (Foreign Key)
- FK_Improvement_InspectionDetail: inspection_detail_id (Foreign Key)
- FK_Improvement_User_Responsible: responsible_user_id (Foreign Key)
- FK_Improvement_User_Verifier: verified_by (Foreign Key)
- IX_Improvement_Status: status
- IX_Improvement_Priority: priority
- IX_Improvement_DueDate: due_date

### 3.4 ���� ���� ����

#### 3.4.1 Report (���� ���̺�)
���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| report_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| report_type | VARCHAR | 50 | NO | - | ���� ���� | - |
| title | VARCHAR | 200 | NO | - | ���� | - |
| description | TEXT | - | YES | NULL | ���� | - |
| content | TEXT | - | YES | NULL | ���� | - |
| format | VARCHAR | 20 | NO | 'PDF' | ���� (PDF/EXCEL/WORD) | - |
| report_date | DATE | - | NO | - | ������ | - |
| target | VARCHAR | 50 | NO | - | ��� (����/�������) | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | ���� (�ʾ�/����/����) | - |
| creator_id | VARCHAR | 20 | NO | - | �ۼ��� ID | FK(User) |
| approver_id | VARCHAR | 20 | YES | NULL | ������ ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | �����Ͻ� | - |
| submitted_at | DATETIME | - | YES | NULL | �����Ͻ� | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| file_path | VARCHAR | 255 | YES | NULL | ���� ��� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Report: report_id (Primary Key)
- FK_Report_User_Creator: creator_id (Foreign Key)
- FK_Report_User_Approver: approver_id (Foreign Key)
- IX_Report_Type: report_type
- IX_Report_Date: report_date
- IX_Report_Status: status

#### 3.4.2 ReportTemplate (���� ���ø� ���̺�)
���� ���ø� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| template_id | VARCHAR | 20 | NO | - | ���ø� ID | PK |
| template_name | VARCHAR | 100 | NO | - | ���ø��� | - |
| template_type | VARCHAR | 50 | NO | - | ���ø� ���� | - |
| description | TEXT | - | YES | NULL | ���� | - |
| content | TEXT | - | NO | - | ���� | - |
| format | VARCHAR | 20 | NO | 'PDF' | ���� (PDF/EXCEL/WORD) | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ReportTemplate: template_id (Primary Key)
- IX_ReportTemplate_Name: template_name
- IX_ReportTemplate_Type: template_type

#### 3.4.3 ReportAttachment (���� ÷������ ���̺�)
���� ÷������ ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| attachment_id | VARCHAR | 20 | NO | - | ÷������ ID | PK |
| report_id | VARCHAR | 20 | NO | - | ���� ID | FK(Report) |
| file_name | VARCHAR | 255 | NO | - | ���ϸ� | - |
| file_path | VARCHAR | 255 | NO | - | ���� ��� | - |
| file_type | VARCHAR | 50 | NO | - | ���� ���� | - |
| file_size | INT | - | NO | - | ���� ũ��(byte) | - |
| description | VARCHAR | 255 | YES | NULL | ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ReportAttachment: attachment_id (Primary Key)
- FK_ReportAttachment_Report: report_id (Foreign Key)
- IX_ReportAttachment_FileName: file_name

### 3.5 ���� ���� ����

#### 3.5.1 Document (���� ���̺�)
���� ��� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| document_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| document_type | VARCHAR | 50 | NO | - | ���� ���� | - |
| title | VARCHAR | 200 | NO | - | ���� | - |
| content | TEXT | - | NO | - | ���� | - |
| target_id | VARCHAR | 20 | YES | NULL | ��� ID (å��/�Ŵ���/���� ��) | - |
| target_type | VARCHAR | 50 | YES | NULL | ��� ���� | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | ���� (�ʾ�/����/�Ϸ�/�ݷ�) | - |
| creator_id | VARCHAR | 20 | NO | - | �ۼ��� ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Document: document_id (Primary Key)
- FK_Document_User: creator_id (Foreign Key)
- IX_Document_Type: document_type
- IX_Document_Status: status
- IX_Document_Target: target_id, target_type

#### 3.5.2 Approval (���� ���̺�)
���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| approval_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| document_id | VARCHAR | 20 | NO | - | ���� ID | FK(Document) |
| approval_line_id | VARCHAR | 20 | NO | - | ���缱 ID | FK(ApprovalLine) |
| title | VARCHAR | 200 | NO | - | ���� | - |
| content | TEXT | - | YES | NULL | ���� | - |
| status | VARCHAR | 20 | NO | 'REQUESTED' | ���� (��û/����/����/�ݷ�) | - |
| requester_id | VARCHAR | 20 | NO | - | ��û�� ID | FK(User) |
| requested_at | DATETIME | - | NO | CURRENT_TIMESTAMP | ��û�Ͻ� | - |
| completed_at | DATETIME | - | YES | NULL | �Ϸ��Ͻ� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Approval: approval_id (Primary Key)
- FK_Approval_Document: document_id (Foreign Key)
- FK_Approval_ApprovalLine: approval_line_id (Foreign Key)
- FK_Approval_User: requester_id (Foreign Key)
- IX_Approval_Status: status
- IX_Approval_RequestedAt: requested_at

#### 3.5.3 ApprovalLine (���缱 ���̺�)
���缱 ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| approval_line_id | VARCHAR | 20 | NO | - | ���缱 ID | PK |
| line_name | VARCHAR | 100 | NO | - | ���缱�� | - |
| description | VARCHAR | 255 | YES | NULL | ���� | - |
| document_type | VARCHAR | 50 | YES | NULL | ���� ���� | - |
| is_template | BOOLEAN | - | NO | FALSE | ���ø� ���� | - |
| creator_id | VARCHAR | 20 | NO | - | ������ ID | FK(User) |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ApprovalLine: approval_line_id (Primary Key)
- FK_ApprovalLine_User: creator_id (Foreign Key)
- IX_ApprovalLine_Name: line_name
- IX_ApprovalLine_DocType: document_type

#### 3.5.4 ApprovalLineDetail (���缱 �� ���̺�)
���缱 �� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| approval_line_detail_id | VARCHAR | 20 | NO | - | ���缱 �� ID | PK |
| approval_line_id | VARCHAR | 20 | NO | - | ���缱 ID | FK(ApprovalLine) |
| step | INT | - | NO | 1 | �ܰ� | - |
| approver_id | VARCHAR | 20 | NO | - | ������ ID | FK(User) |
| approver_type | VARCHAR | 20 | NO | 'APPROVER' | ������ ���� (����/����/����) | - |
| is_mandatory | BOOLEAN | - | NO | TRUE | �ʼ� ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ApprovalLineDetail: approval_line_detail_id (Primary Key)
- FK_ApprovalLineDetail_ApprovalLine: approval_line_id (Foreign Key)
- FK_ApprovalLineDetail_User: approver_id (Foreign Key)
- IX_ApprovalLineDetail_Step: approval_line_id, step

#### 3.5.5 ApprovalHistory (���� �̷� ���̺�)
���� �̷� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| history_id | VARCHAR | 20 | NO | - | �̷� ID | PK |
| approval_id | VARCHAR | 20 | NO | - | ���� ID | FK(Approval) |
| approval_line_detail_id | VARCHAR | 20 | NO | - | ���缱 �� ID | FK(ApprovalLineDetail) |
| approver_id | VARCHAR | 20 | NO | - | ������ ID | FK(User) |
| action | VARCHAR | 20 | NO | - | �׼� (����/�ݷ�/����) | - |
| comment | TEXT | - | YES | NULL | �ڸ�Ʈ | - |
| action_date | DATETIME | - | NO | CURRENT_TIMESTAMP | �׼��Ͻ� | - |
| delegated_to | VARCHAR | 20 | YES | NULL | ���ӹ��� ����� ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |

**�ε���**:
- PK_ApprovalHistory: history_id (Primary Key)
- FK_ApprovalHistory_Approval: approval_id (Foreign Key)
- FK_ApprovalHistory_ApprovalLineDetail: approval_line_detail_id (Foreign Key)
- FK_ApprovalHistory_User_Approver: approver_id (Foreign Key)
- FK_ApprovalHistory_User_Delegated: delegated_to (Foreign Key)
- IX_ApprovalHistory_ActionDate: action_date

### 3.6 �ý��� ���� ����

#### 3.6.1 User (����� ���̺�)
����� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| user_id | VARCHAR | 20 | NO | - | ����� ID | PK |
| username | VARCHAR | 50 | NO | - | ����ڸ� | - |
| employee_id | VARCHAR | 20 | YES | NULL | ������ȣ | - |
| email | VARCHAR | 100 | NO | - | �̸��� | - |
| password | VARCHAR | 255 | NO | - | ��ȣȭ�� ��й�ȣ | - |
| dept_id | VARCHAR | 20 | YES | NULL | �μ� ID | FK(Department) |
| position | VARCHAR | 50 | YES | NULL | ���� | - |
| phone | VARCHAR | 20 | YES | NULL | ��ȭ��ȣ | - |
| status | VARCHAR | 20 | NO | 'ACTIVE' | ���� (Ȱ��/��Ȱ��/���) | - |
| last_login | DATETIME | - | YES | NULL | ������ �α��� | - |
| is_admin | BOOLEAN | - | NO | FALSE | ������ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_User: user_id (Primary Key)
- FK_User_Department: dept_id (Foreign Key)
- UX_User_Username: username (Unique)
- UX_User_Email: email (Unique)
- IX_User_EmployeeId: employee_id
- IX_User_Status: status

#### 3.6.2 Role (���� ���̺�)
����� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| role_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| role_name | VARCHAR | 50 | NO | - | ���Ҹ� | - |
| description | VARCHAR | 255 | YES | NULL | ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Role: role_id (Primary Key)
- UX_Role_Name: role_name (Unique)

#### 3.6.3 UserRole (�����-���� ���� ���̺�)
����ڿ� ���� ���� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| user_role_id | VARCHAR | 20 | NO | - | �����-���� ���� ID | PK |
| user_id | VARCHAR | 20 | NO | - | ����� ID | FK(User) |
| role_id | VARCHAR | 20 | NO | - | ���� ID | FK(Role) |
| granted_date | DATETIME | - | NO | CURRENT_TIMESTAMP | �ο��Ͻ� | - |
| granted_by | VARCHAR | 20 | NO | - | �ο��� ID | FK(User) |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_UserRole: user_role_id (Primary Key)
- FK_UserRole_User: user_id (Foreign Key)
- FK_UserRole_Role: role_id (Foreign Key)
- FK_UserRole_User_Granter: granted_by (Foreign Key)
- UX_UserRole_Unique: user_id, role_id (Unique)

#### 3.6.4 Permission (���� ���̺�)
�ý��� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| permission_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| permission_name | VARCHAR | 50 | NO | - | ���Ѹ� | - |
| description | VARCHAR | 255 | YES | NULL | ���� | - |
| resource | VARCHAR | 50 | NO | - | �ڿ� (�޴�/���) | - |
| action | VARCHAR | 20 | NO | - | �׼� (��ȸ/����/����/����) | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Permission: permission_id (Primary Key)
- UX_Permission_Name: permission_name (Unique)
- IX_Permission_Resource: resource, action

#### 3.6.5 RolePermission (����-���� ���� ���̺�)
���Ұ� ���� ���� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| role_permission_id | VARCHAR | 20 | NO | - | ����-���� ���� ID | PK |
| role_id | VARCHAR | 20 | NO | - | ���� ID | FK(Role) |
| permission_id | VARCHAR | 20 | NO | - | ���� ID | FK(Permission) |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_RolePermission: role_permission_id (Primary Key)
- FK_RolePermission_Role: role_id (Foreign Key)
- FK_RolePermission_Permission: permission_id (Foreign Key)
- UX_RolePermission_Unique: role_id, permission_id (Unique)

#### 3.6.6 Code (�ڵ� ���̺�)
�ý��� �ڵ� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| code_id | VARCHAR | 20 | NO | - | �ڵ� ID | PK |
| code_group | VARCHAR | 50 | NO | - | �ڵ� �׷� | - |
| code | VARCHAR | 50 | NO | - | �ڵ� | - |
| code_name | VARCHAR | 100 | NO | - | �ڵ�� | - |
| description | VARCHAR | 255 | YES | NULL | ���� | - |
| sort_order | INT | - | NO | 0 | ���� ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Code: code_id (Primary Key)
- UX_Code_Unique: code_group, code (Unique)
- IX_Code_Group: code_group
- IX_Code_SortOrder: code_group, sort_order

#### 3.6.7 AuditLog (���� �α� ���̺�)
�ý��� ���� �α� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| log_id | VARCHAR | 20 | NO | - | �α� ID | PK |
| user_id | VARCHAR | 20 | YES | NULL | ����� ID | FK(User) |
| action | VARCHAR | 20 | NO | - | �׼� (�α���/�α׾ƿ�/��ȸ/����/����/����) | - |
| entity_type | VARCHAR | 50 | YES | NULL | ��ƼƼ ���� | - |
| entity_id | VARCHAR | 20 | YES | NULL | ��ƼƼ ID | - |
| description | TEXT | - | YES | NULL | ���� | - |
| ip_address | VARCHAR | 50 | YES | NULL | IP �ּ� | - |
| user_agent | VARCHAR | 255 | YES | NULL | ����� ������Ʈ | - |
| log_date | DATETIME | - | NO | CURRENT_TIMESTAMP | �α� �Ͻ� | - |
| additional_info | TEXT | - | YES | NULL | �߰� ���� | - |

**�ε���**:
- PK_AuditLog: log_id (Primary Key)
- FK_AuditLog_User: user_id (Foreign Key)
- IX_AuditLog_Action: action
- IX_AuditLog_Entity: entity_type, entity_id
- IX_AuditLog_LogDate: log_date

#### 3.6.8 Notification (�˸� ���̺�)
�ý��� �˸� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| notification_id | VARCHAR | 20 | NO | - | �˸� ID | PK |
| user_id | VARCHAR | 20 | NO | - | ����� ID | FK(User) |
| notification_type | VARCHAR | 50 | NO | - | �˸� ���� | - |
| title | VARCHAR | 200 | NO | - | ���� | - |
| content | TEXT | - | NO | - | ���� | - |
| related_entity_type | VARCHAR | 50 | YES | NULL | ���� ��ƼƼ ���� | - |
| related_entity_id | VARCHAR | 20 | YES | NULL | ���� ��ƼƼ ID | - |
| is_read | BOOLEAN | - | NO | FALSE | ���� ���� | - |
| read_at | DATETIME | - | YES | NULL | ���� �Ͻ� | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| expires_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Notification: notification_id (Primary Key)
- FK_Notification_User: user_id (Foreign Key)
- IX_Notification_Type: notification_type
- IX_Notification_IsRead: user_id, is_read
- IX_Notification_CreatedAt: created_at
- IX_Notification_Entity: related_entity_type, related_entity_id

## 4. �����ͺ��̽� ���� �� ��������

### 4.1 �ֿ� ����

#### 4.1.1 ����/�λ� ���� ����
- **Organization - Department**: �ϳ��� ������ ���� �μ��� ���� (1:N)
- **Department - Executive**: �ϳ��� �μ��� ���� �ӿ�/�μ����� ���� (1:N)
- **Organization - Executive**: �ϳ��� ������ ���� �ӿ��� ���� (1:N)
- **Committee - CommitteeMember**: �ϳ��� ����ü�� ���� �������� ���� (1:N)
- **Executive - CommitteeMember**: �ϳ��� �ӿ��� ���� ����ü �������� �� �� ���� (1:N)

#### 4.1.2 å�� ���� ����
- **Duty - DutyDescription**: �ϳ��� å���� ���� å��������� ���� (1:N)
- **Duty - ExecutiveDuty**: �ϳ��� å���� ���� �ӿ����� �Ҵ�� �� ���� (1:N)
- **Executive - ExecutiveDuty**: �ϳ��� �ӿ����� ���� å���� �Ҵ�� �� ���� (1:N)
- **Duty - DutyOrganization**: �ϳ��� å���� ���� ������ �Ҵ�� �� ���� (1:N)
- **Organization - DutyOrganization**: �ϳ��� ������ ���� å���� �Ҵ�� �� ���� (1:N)
- **Duty - ControlManual**: �ϳ��� å���� ���� �������� �Ŵ����� ������ �� ���� (1:N)

#### 4.1.3 �������� ���� ����
- **Department - ControlActivity**: �ϳ��� �μ����� ���� ��������Ȱ���� ���� (1:N)
- **ControlManual - ControlActivity**: �ϳ��� �Ŵ��� ���� ��������Ȱ���� ���� (1:N)
- **ControlManual - Checklist**: �ϳ��� �Ŵ��� ���� üũ����Ʈ�� ���� (1:N)
- **Checklist - ChecklistItem**: �ϳ��� üũ����Ʈ�� ���� �׸��� ���� (1:N)
- **Department - Inspection**: �ϳ��� �μ����� ���� ���������� ���� (1:N)
- **Checklist - Inspection**: �ϳ��� üũ����Ʈ�� ���� ���������� ���� (1:N)
- **ControlActivity - Inspection**: �ϳ��� ��������Ȱ���� ���� ���������� ���� (1:N)
- **Inspection - InspectionDetail**: �ϳ��� �������˿� ���� �� ����� ���� (1:N)
- **ChecklistItem - InspectionDetail**: �ϳ��� üũ����Ʈ �׸� ���� ���� �������� �� ����� ���� �� ���� (1:N)
- **Inspection - Improvement**: �ϳ��� �������˿� ���� �������/������ȹ�� ���� �� ���� (1:N)
- **InspectionDetail - Improvement**: �ϳ��� �������� �󼼿� ���� �������/������ȹ�� ���� �� ���� (1:N)

#### 4.1.4 ���� ���� ����
- **Report - ReportAttachment**: �ϳ��� ������ ���� ÷�������� ���� �� ���� (1:N)

#### 4.1.5 ���� ���� ����
- **Document - Approval**: �ϳ��� ������ ���� ���簡 ���� �� ���� (1:N)
- **ApprovalLine - Approval**: �ϳ��� ���缱���� ���� ���簡 �̷���� �� ���� (1:N)
- **ApprovalLine - ApprovalLineDetail**: �ϳ��� ���缱�� ���� �����ڰ� ���� (1:N)
- **Approval - ApprovalHistory**: �ϳ��� ���翡 ���� �̷��� ���� �� ���� (1:N)
- **ApprovalLineDetail - ApprovalHistory**: �ϳ��� ���缱 �󼼿� ���� �̷��� ���� �� ���� (1:N)

#### 4.1.6 �����/���� ���� ����
- **User - UserRole**: �ϳ��� ����ڰ� ���� ������ ���� �� ���� (1:N)
- **Role - UserRole**: �ϳ��� ���ҿ� ���� ����ڰ� �Ҵ�� �� ���� (1:N)
- **Role - RolePermission**: �ϳ��� ���ҿ� ���� ������ �Ҵ�� �� ���� (1:N)
- **Permission - RolePermission**: �ϳ��� ������ ���� ���ҿ� �Ҵ�� �� ���� (1:N)

### 4.2 �ֿ� ��������

#### 4.2.1 �⺻ Ű ��������
- ��� ���̺��� ������ �⺻ Ű(Primary Key)�� ����
- �⺻ Ű�� UUID �Ǵ� �������� Ȱ���Ͽ� ����

#### 4.2.2 �ܷ� Ű ��������
- ���� ���Ἲ�� ���� �ܷ� Ű(Foreign Key) �������� ����
- �θ� ���ڵ� ���� �� �ڽ� ���ڵ� ó�� ��� ���� (CASCADE, SET NULL, RESTRICT ��)

#### 4.2.3 ���� ��������
- �ߺ� ������ ������ ���� ����(Unique) �������� ����
- �ڵ�, ����ڸ�, �̸��� �� �����ؾ� �ϴ� �ʵ忡 ����

#### 4.2.4 NULL ��������
- �ʼ� �ʵ忡 ���� NOT NULL �������� ����
- ������ �ʵ�� NULL ���

#### 4.2.5 �⺻�� ��������
- �����Ͻ�, ���� �� �⺻���� �ʿ��� �ʵ忡 DEFAULT �������� ����

## 5. ������ ���̱׷��̼�

### 5.1 ���̱׷��̼� ����
- �ܰ��� ���̱׷��̼� ���� ��� ä��
- ���� �ý��� ������ �м� �� ����
- ETL(Extract, Transform, Load) ���μ��� ����
- ������ ���� �� ���� ���� ����

### 5.2 ���̱׷��̼� ��� ������
- ���� �� �μ� ����
- �ӿ� �� �μ��� ����
- å�� �� å������� ����
- �������� �Ŵ��� ����
- �������� �̷� ����
- ����� �� ���� ����

### 5.3 ���̱׷��̼� ����
1. �ҽ� ������ ���� �� �м�
2. ������ ��ȯ �� ����
3. �׽�Ʈ ȯ�濡�� ������ �ε�
4. ������ ���� �� ���Ἲ Ȯ��
5. ���� ���� �� ��ε�
6. � ȯ������ ������ ���̱׷��̼�
7. ���� ���� �� Ȯ��

## 6. �����ͺ��̽� ���� ����ȭ

### 6.1 �ε��� ����
- ��ȸ ���� ����� ���� ������ �ε��� ����
- ���� �ε��� Ȱ��
- �ε��� ��� ����͸� �� ����ȭ

### 6.2 ��Ƽ�Ŵ� ����
- ��뷮 ���̺�(���� �α�, �̷� ���̺� ��)�� ���� ��Ƽ�Ŵ� ����
- �ð� ��� ��Ƽ�Ŵ� Ȱ��

### 6.3 ���� ����ȭ
- ���� ���Ǵ� ������ ���� ����ȭ
- ���� ��ȹ �м� �� Ʃ��
- ������ ���� ��� ����

### 6.4 ĳ�� ����
- ���� ��ȸ�Ǵ� �����Ϳ� ���� ĳ�� ����
- ĳ�� ��ȿȭ ���� ����

## 7. ���� �� ����

### 7.1 ������ ����
- �߿� ������ ��ȣȭ ����
- ���� ���� ��Ŀ���� ����
- �������� ��ȣ ��� ����

### 7.2 ���� ����
- ������ ���濡 ���� ���� �α� ���
- ����� Ȱ�� ����͸�
- �̻� ���� Ž�� ��Ŀ���� ����

## �η�

### A. ��� ����
- **PK**: Primary Key (�⺻ Ű)
- **FK**: Foreign Key (�ܷ� Ű)
- **UX**: Unique Index (���� �ε���)
- **IX**: Non-Unique Index (����� �ε���)

### B. ���� �̷�

| ���� | ���� | ������ | ���� ���� | ������ |
|------|------|--------|-----------|--------|
| 1.0 | 2025-07-14 | - | ���� �ۼ� | - || result | VARCHAR | 20 | YES | NULL | ��� (����/������) | - |
| comment | TEXT | - | YES | NULL | �ڸ�Ʈ | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Inspection: inspection_id (Primary Key)
- FK_Inspection_Department: dept_id (Foreign Key)
- FK_Inspection_Checklist: checklist_id (Foreign Key)
- FK_Inspection_ControlActivity: activity_id (Foreign Key)
- FK_Inspection_User_Inspector: inspector_id (Foreign Key)
- FK_Inspection_User_Reviewer: reviewer_id (Foreign Key)
- FK_Inspection_User_Approver: approver_id (Foreign Key)
- IX_Inspection_Date: inspection_date
- IX_Inspection_Status: status

#### 3.3.5 InspectionDetail (�������� �� ���̺�)
�������� �׸� ����� �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| inspection_detail_id | VARCHAR | 20 | NO | - | �������� �� ID | PK |
| inspection_id | VARCHAR | 20 | NO | - | �������� ID | FK(Inspection) |
| item_id | VARCHAR | 20 | NO | - | üũ����Ʈ �׸� ID | FK(ChecklistItem) |
| result | VARCHAR | 20 | NO | - | ��� (����/������/�ش����) | - |
| evidence | TEXT | - | YES | NULL | �������� | - |
| comment | TEXT | - | YES | NULL | �ڸ�Ʈ | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_InspectionDetail: inspection_detail_id (Primary Key)
- FK_InspectionDetail_Inspection: inspection_id (Foreign Key)
- FK_InspectionDetail_ChecklistItem: item_id (Foreign Key)
- IX_InspectionDetail_Result: result

#### 3.3.6 Improvement (�������/������ȹ ���̺�)
������� �� ������ȹ ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| improvement_id | VARCHAR | 20 | NO | - | ������ȹ ID | PK |
| inspection_id | VARCHAR | 20 | NO | - | �������� ID | FK(Inspection) |
| inspection_detail_id | VARCHAR | 20 | YES | NULL | �������� �� ID | FK(InspectionDetail) |
| issue_description | TEXT | - | NO | - | ������� ���� | - |
| cause | TEXT | - | YES | NULL | ���� | - |
| improvement_plan | TEXT | - | YES | NULL | ������ȹ | - |
| status | VARCHAR | 20 | NO | 'OPEN' | ���� (����/����/�Ϸ�) | - |
| priority | VARCHAR | 20 | NO | 'MEDIUM' | �켱���� (��/��/��) | - |
| due_date | DATE | - | YES | NULL | �ϷΌ���� | - |
| responsible_user_id | VARCHAR | 20 | NO | - | ����� ID | FK(User) |
| completed_date | DATE | - | YES | NULL | �Ϸ��� | - |
| verification_date | DATE | - | YES | NULL | ������ | - |
| verified_by | VARCHAR | 20 | YES | NULL | ������ ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Improvement: improvement_id (Primary Key)
- FK_Improvement_Inspection: inspection_id (Foreign Key)
- FK_Improvement_InspectionDetail: inspection_detail_id (Foreign Key)
- FK_Improvement_User_Responsible: responsible_user_id (Foreign Key)
- FK_Improvement_User_Verifier: verified_by (Foreign Key)
- IX_Improvement_Status: status
- IX_Improvement_Priority: priority
- IX_Improvement_DueDate: due_date

### 3.4 ���� ���� ����

#### 3.4.1 Report (���� ���̺�)
���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| report_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| report_type | VARCHAR | 50 | NO | - | ���� ���� | - |
| title | VARCHAR | 200 | NO | - | ���� | - |
| description | TEXT | - | YES | NULL | ���� | - |
| content | TEXT | - | YES | NULL | ���� | - |
| format | VARCHAR | 20 | NO | 'PDF' | ���� (PDF/EXCEL/WORD) | - |
| report_date | DATE | - | NO | - | ������ | - |
| target | VARCHAR | 50 | NO | - | ��� (����/�������) | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | ���� (�ʾ�/����/����) | - |
| creator_id | VARCHAR | 20 | NO | - | �ۼ��� ID | FK(User) |
| approver_id | VARCHAR | 20 | YES | NULL | ������ ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | �����Ͻ� | - |
| submitted_at | DATETIME | - | YES | NULL | �����Ͻ� | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| file_path | VARCHAR | 255 | YES | NULL | ���� ��� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Report: report_id (Primary Key)
- FK_Report_User_Creator: creator_id (Foreign Key)
- FK_Report_User_Approver: approver_id (Foreign Key)
- IX_Report_Type: report_type
- IX_Report_Date: report_date
- IX_Report_Status: status

#### 3.4.2 ReportTemplate (���� ���ø� ���̺�)
���� ���ø� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| template_id | VARCHAR | 20 | NO | - | ���ø� ID | PK |
| template_name | VARCHAR | 100 | NO | - | ���ø��� | - |
| template_type | VARCHAR | 50 | NO | - | ���ø� ���� | - |
| description | TEXT | - | YES | NULL | ���� | - |
| content | TEXT | - | NO | - | ���� | - |
| format | VARCHAR | 20 | NO | 'PDF' | ���� (PDF/EXCEL/WORD) | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ReportTemplate: template_id (Primary Key)
- IX_ReportTemplate_Name: template_name
- IX_ReportTemplate_Type: template_type

#### 3.4.3 ReportAttachment (���� ÷������ ���̺�)
���� ÷������ ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| attachment_id | VARCHAR | 20 | NO | - | ÷������ ID | PK |
| report_id | VARCHAR | 20 | NO | - | ���� ID | FK(Report) |
| file_name | VARCHAR | 255 | NO | - | ���ϸ� | - |
| file_path | VARCHAR | 255 | NO | - | ���� ��� | - |
| file_type | VARCHAR | 50 | NO | - | ���� ���� | - |
| file_size | INT | - | NO | - | ���� ũ��(byte) | - |
| description | VARCHAR | 255 | YES | NULL | ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ReportAttachment: attachment_id (Primary Key)
- FK_ReportAttachment_Report: report_id (Foreign Key)
- IX_ReportAttachment_FileName: file_name

### 3.5 ���� ���� ����

#### 3.5.1 Document (���� ���̺�)
���� ��� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| document_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| document_type | VARCHAR | 50 | NO | - | ���� ���� | - |
| title | VARCHAR | 200 | NO | - | ���� | - |
| content | TEXT | - | NO | - | ���� | - |
| target_id | VARCHAR | 20 | YES | NULL | ��� ID (å��/�Ŵ���/���� ��) | - |
| target_type | VARCHAR | 50 | YES | NULL | ��� ���� | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | ���� (�ʾ�/����/�Ϸ�/�ݷ�) | - |
| creator_id | VARCHAR | 20 | NO | - | �ۼ��� ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Document: document_id (Primary Key)
- FK_Document_User: creator_id (Foreign Key)
- IX_Document_Type: document_type
- IX_Document_Status: status
- IX_Document_Target: target_id, target_type

#### 3.5.2 Approval (���� ���̺�)
���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| approval_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| document_id | VARCHAR | 20 | NO | - | ���� ID | FK(Document) |
| approval_line_id | VARCHAR | 20 | NO | - | ���缱 ID | FK(ApprovalLine) |
| title | VARCHAR | 200 | NO | - | ���� | - |
| content | TEXT | - | YES | NULL | ���� | - |
| status | VARCHAR | 20 | NO | 'REQUESTED' | ���� (��û/����/����/�ݷ�) | - |
| requester_id | VARCHAR | 20 | NO | - | ��û�� ID | FK(User) |
| requested_at | DATETIME | - | NO | CURRENT_TIMESTAMP | ��û�Ͻ� | - |
| completed_at | DATETIME | - | YES | NULL | �Ϸ��Ͻ� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Approval: approval_id (Primary Key)
- FK_Approval_Document: document_id (Foreign Key)
- FK_Approval_ApprovalLine: approval_line_id (Foreign Key)
- FK_Approval_User: requester_id (Foreign Key)
- IX_Approval_Status: status
- IX_Approval_RequestedAt: requested_at

#### 3.5.3 ApprovalLine (���缱 ���̺�)
���缱 ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| approval_line_id | VARCHAR | 20 | NO | - | ���缱 ID | PK |
| line_name | VARCHAR | 100 | NO | - | ���缱�� | - |
| description | VARCHAR | 255 | YES | NULL | ���� | - |
| document_type | VARCHAR | 50 | YES | NULL | ���� ���� | - |
| is_template | BOOLEAN | - | NO | FALSE | ���ø� ���� | - |
| creator_id | VARCHAR | 20 | NO | - | ������ ID | FK(User) |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ApprovalLine: approval_line_id (Primary Key)
- FK_ApprovalLine_User: creator_id (Foreign Key)
- IX_ApprovalLine_Name: line_name
- IX_ApprovalLine_DocType: document_type

#### 3.5.4 ApprovalLineDetail (���缱 �� ���̺�)
���缱 �� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| approval_line_detail_id | VARCHAR | 20 | NO | - | ���缱 �� ID | PK |
| approval_line_id | VARCHAR | 20 | NO | - | ���缱 ID | FK(ApprovalLine) |
| step | INT | - | NO | 1 | �ܰ� | - |
| approver_id | VARCHAR | 20 | NO | - | ������ ID | FK(User) |
| approver_type | VARCHAR | 20 | NO | 'APPROVER' | ������ ���� (����/����/����) | - |
| is_mandatory | BOOLEAN | - | NO | TRUE | �ʼ� ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ApprovalLineDetail: approval_line_detail_id (Primary Key)
- FK_ApprovalLineDetail_ApprovalLine: approval_line_id (Foreign Key)
- FK_ApprovalLineDetail_User: approver_id (Foreign Key)
- IX_ApprovalLineDetail_Step: approval_line_id, step

#### 3.5.5 ApprovalHistory (���� �̷� ���̺�)
���� �̷� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| history_id | VARCHAR | 20 | NO | - | �̷� ID | PK |
| approval_id | VARCHAR | 20 | NO | - | ���� ID | FK(Approval) |
| approval_line_detail_id | VARCHAR | 20 | NO | - | ���缱 �� ID | FK(ApprovalLineDetail) |
| approver_id | VARCHAR | 20 | NO | - | ������ ID | FK(User) |
| action | VARCHAR | 20 | NO | - | �׼� (����/�ݷ�/����) | - |
| comment | TEXT | - | YES | NULL | �ڸ�Ʈ | - |
| action_date | DATETIME | - | NO | CURRENT_TIMESTAMP | �׼��Ͻ� | - |
| delegated_to | VARCHAR | 20 | YES | NULL | ���ӹ��� ����� ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |

**�ε���**:
- PK_ApprovalHistory: history_id (Primary Key)
- FK_ApprovalHistory_Approval: approval_id (Foreign Key)
- FK_ApprovalHistory_ApprovalLineDetail: approval_line_detail_id (Foreign Key)
- FK_ApprovalHistory_User_Approver: approver_id (Foreign Key)
- FK_ApprovalHistory_User_Delegated: delegated_to (Foreign Key)
- IX_ApprovalHistory_ActionDate: action_date

### 3.6 �ý��� ���� ����

#### 3.6.1 User (����� ���̺�)
����� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| user_id | VARCHAR | 20 | NO | - | ����� ID | PK |
| username | VARCHAR | 50 | NO | - | ����ڸ� | - |
| employee_id | VARCHAR | 20 | YES | NULL | ������ȣ | - |
| email | VARCHAR | 100 | NO | - | �̸��� | - |
| password | VARCHAR | 255 | NO | - | ��ȣȭ�� ��й�ȣ | - |
| dept_id | VARCHAR | 20 | YES | NULL | �μ� ID | FK(Department) |
| position | VARCHAR | 50 | YES | NULL | ���� | - |
| phone | VARCHAR | 20 | YES | NULL | ��ȭ��ȣ | - |
| status | VARCHAR | 20 | NO | 'ACTIVE' | ���� (Ȱ��/��Ȱ��/���) | - |
| last_login | DATETIME | - | YES | NULL | ������ �α��� | - |
| is_admin | BOOLEAN | - | NO | FALSE | ������ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_User: user_id (Primary Key)
- FK_User_Department: dept_id (Foreign Key)
- UX_User_Username: username (Unique)
- UX_User_Email: email (Unique)
- IX_User_EmployeeId: employee_id
- IX_User_Status: status

#### 3.6.2 Role (���� ���̺�)
����� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| role_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| role_name | VARCHAR | 50 | NO | - | ���Ҹ� | - |
| description | VARCHAR | 255 | YES | NULL | ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Role: role_id (Primary Key)
- UX_Role_Name: role_name (Unique)

#### 3.6.3 UserRole (�����-���� ���� ���̺�)
����ڿ� ���� ���� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| user_role_id | VARCHAR | 20 | NO | - | �����-���� ���� ID | PK |
| user_id | VARCHAR | 20 | NO | - | ����� ID | FK(User) |
| role_id | VARCHAR | 20 | NO | - | ���� ID | FK(Role) |
| granted_date | DATETIME | - | NO | CURRENT_TIMESTAMP | �ο��Ͻ� | - |
| granted_by | VARCHAR | 20 | NO | - | �ο��� ID | FK(User) |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_UserRole: user_role_id (Primary Key)
- FK_UserRole_User: user_id (Foreign Key)
- FK_UserRole_Role: role_id (Foreign Key)
- FK_UserRole_User_Granter: granted_by (Foreign Key)
- UX_UserRole_Unique: user_id, role_id (Unique)

#### 3.6.4 Permission (���� ���̺�)
�ý��� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| permission_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| permission_name | VARCHAR | 50 | NO | - | ���Ѹ� | - |
| description | VARCHAR | 255 | YES | NULL | ���� | - |
| resource | VARCHAR | 50 | NO | - | �ڿ� (�޴�/���) | - |
| action | VARCHAR | 20 | NO | - | �׼� (��ȸ/����/����/����) | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Permission: permission_id (Primary Key)
- UX_Permission_Name: permission_name (Unique)
- IX_Permission_Resource: resource, action

#### 3.6.5 RolePermission (����-���� ���� ���̺�)
���Ұ� ���� ���� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| role_permission_id | VARCHAR | 20 | NO | - | ����-���� ���� ID | PK |
| role_id | VARCHAR | 20 | NO | - | ���� ID | FK(Role) |
| permission_id | VARCHAR | 20 | NO | - | ���� ID | FK(Permission) |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_RolePermission: role_permission_id (Primary Key)
- FK_RolePermission_Role: role_id (Foreign Key)
- FK_RolePermission_Permission: permission_id (Foreign Key)
- UX_RolePermission_Unique: role_id, permission_id (Unique)

#### 3.6.6 Code (�ڵ� ���̺�)
�ý��� �ڵ� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| code_id | VARCHAR | 20 | NO | - | �ڵ� ID | PK |
| code_group | VARCHAR | 50 | NO | - | �ڵ� �׷� | - |
| code | VARCHAR | 50 | NO | - | �ڵ� | - |
| code_name | VARCHAR | 100 | NO | - | �ڵ�� | - |
| description | VARCHAR | 255 | YES | NULL | ���� | - |
| sort_order | INT | - | NO | 0 | ���� ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ # ���� å�������� ���� �ý��� DB ���輭

## 1. ����

### 1.1 ����
�� ������ ���� å�������� ���� �ý����� �����ͺ��̽� ���踦 �����Ѵ�. �ý����� �䱸������ ȿ�������� �����ϱ� ���� �����ͺ��̽� ����, ���̺�, �ʵ�, ���� ���� ���� ����Ѵ�.

### 1.2 ����
- å������ ���� ������
- �������� ���� ������
- ���� ���� ������
- ���� ���� ������
- �ý��� ���� ������

### 1.3 ���� ����
- ���� å�������� ���� �ý��� �䱸���� ���Ǽ�

## 2. �����ͺ��̽� ����

### 2.1 �����ͺ��̽� ����
- **DBMS**: ������ �����ͺ��̽�(RDBMS)
- **���� ���ڵ�**: UTF-8
- **�ֿ� ����**:
  - ����/�λ� ���� ����
  - å�� ���� ����
  - �������� ���� ����
  - ���� ���� ����
  - ���� ���� ����
  - �ý��� ���� ����

### 2.2 ���� ������ �� (ERD)
���� å�������� ���� �ý����� �ֿ� ��ƼƼ�� ����� ������ ����:

- ����(Organization) �� �ӿ�/�μ���(Executive) : 1:N ����
- �ӿ�/�μ���(Executive) �� å��(Duty) : N:M ���� (ExecutiveDuty �߰� ���̺�)
- å��(Duty) �� å�������(DutyDescription) : 1:N ����
- å��(Duty) �� ���������Ŵ���(ControlManual) : 1:N ����
- �μ�(Department) �� ��������Ȱ��(ControlActivity) : 1:N ����
- ��������Ȱ��(ControlActivity) �� ��������(Inspection) : 1:N ����
- ��������(Inspection) �� �������(Improvement) : 1:N ����
- ����(Document) �� ����(Approval) : 1:N ����
- �����(User) �� ����(Role) : N:M ���� (UserRole �߰� ���̺�)

## 3. ���̺� ����

### 3.1 ����/�λ� ���� ����

#### 3.1.1 Organization (���� ���̺�)
���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| org_id | VARCHAR | 20 | NO | - | ���� ID | PK |
| org_name | VARCHAR | 100 | NO | - | ������ | - |
| org_type | VARCHAR | 20 | NO | - | ���� ���� (����, �μ�, �� ��) | - |
| parent_org_id | VARCHAR | 20 | YES | NULL | ���� ���� ID | FK(Organization) |
| org_level | INT | - | NO | 0 | ���� ���� | - |
| description | VARCHAR | 500 | YES | NULL | ���� ���� | - |
| effective_date | DATE | - | NO | - | ������ | - |
| expiry_date | DATE | - | YES | NULL | ������ | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Organization: org_id (Primary Key)
- IX_Organization_Parent: parent_org_id (Foreign Key)
- IX_Organization_Name: org_name

#### 3.1.2 Department (�μ� ���̺�)
�μ� �� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| dept_id | VARCHAR | 20 | NO | - | �μ� ID | PK |
| org_id | VARCHAR | 20 | NO | - | ���� ID | FK(Organization) |
| dept_code | VARCHAR | 20 | NO | - | �μ� �ڵ� | - |
| dept_name | VARCHAR | 100 | NO | - | �μ��� | - |
| dept_head_id | VARCHAR | 20 | YES | NULL | �μ��� ID | FK(Executive) |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Department: dept_id (Primary Key)
- FK_Department_Organization: org_id (Foreign Key)
- FK_Department_Executive: dept_head_id (Foreign Key)
- IX_Department_Code: dept_code

#### 3.1.3 Executive (�ӿ�/�μ��� ���̺�)
�ӿ� �� �μ��� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| executive_id | VARCHAR | 20 | NO | - | �ӿ�/�μ��� ID | PK |
| user_id | VARCHAR | 20 | NO | - | ����� ID | FK(User) |
| org_id | VARCHAR | 20 | NO | - | �Ҽ� ���� ID | FK(Organization) |
| position | VARCHAR | 50 | NO | - | ���� | - |
| title | VARCHAR | 50 | YES | NULL | ��å | - |
| executive_type | VARCHAR | 20 | NO | - | �ӿ� ���� (�ӿ�/�μ���) | - |
| appointed_date | DATE | - | NO | - | �Ӹ��� | - |
| resigned_date | DATE | - | YES | NULL | ������ | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Executive: executive_id (Primary Key)
- FK_Executive_User: user_id (Foreign Key)
- FK_Executive_Organization: org_id (Foreign Key)
- IX_Executive_Position: position
- IX_Executive_Type: executive_type

#### 3.1.4 Committee (����ü ���̺�)
����ü ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| committee_id | VARCHAR | 20 | NO | - | ����ü ID | PK |
| committee_name | VARCHAR | 100 | NO | - | ����ü�� | - |
| committee_type | VARCHAR | 50 | NO | - | ����ü ���� | - |
| description | VARCHAR | 500 | YES | NULL | ����ü ���� | - |
| chair_executive_id | VARCHAR | 20 | YES | NULL | ���� �ӿ� ID | FK(Executive) |
| established_date | DATE | - | NO | - | ������ | - |
| disbanded_date | DATE | - | YES | NULL | �ػ��� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Committee: committee_id (Primary Key)
- FK_Committee_Executive: chair_executive_id (Foreign Key)
- IX_Committee_Name: committee_name

#### 3.1.5 CommitteeMember (����ü ������ ���̺�)
����ü ������ ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| committee_member_id | VARCHAR | 20 | NO | - | ����ü ������ ID | PK |
| committee_id | VARCHAR | 20 | NO | - | ����ü ID | FK(Committee) |
| executive_id | VARCHAR | 20 | NO | - | �ӿ� ID | FK(Executive) |
| role | VARCHAR | 50 | YES | NULL | ���� | - |
| joined_date | DATE | - | NO | - | ������ | - |
| left_date | DATE | - | YES | NULL | Ż���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_CommitteeMember: committee_member_id (Primary Key)
- FK_CommitteeMember_Committee: committee_id (Foreign Key)
- FK_CommitteeMember_Executive: executive_id (Foreign Key)
- UX_CommitteeMember_Unique: committee_id, executive_id (Unique)

### 3.2 å�� ���� ����

#### 3.2.1 Duty (å�� ���̺�)
å�� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| duty_id | VARCHAR | 20 | NO | - | å�� ID | PK |
| duty_code | VARCHAR | 50 | NO | - | å�� �ڵ� | - |
| duty_name | VARCHAR | 200 | NO | - | å���� | - |
| duty_type | VARCHAR | 50 | NO | - | å�� ���� | - |
| description | TEXT | - | YES | NULL | å�� ���� | - |
| parent_duty_id | VARCHAR | 20 | YES | NULL | ���� å�� ID | FK(Duty) |
| duty_level | INT | - | NO | 0 | å�� ���� | - |
| priority | INT | - | YES | NULL | �켱���� | - |
| reg_basis | VARCHAR | 500 | YES | NULL | ���� �ٰ� | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Duty: duty_id (Primary Key)
- FK_Duty_ParentDuty: parent_duty_id (Foreign Key)
- IX_Duty_Code: duty_code
- IX_Duty_Name: duty_name
- IX_Duty_Type: duty_type

#### 3.2.2 DutyDescription (å������� ���̺�)
å������� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| duty_desc_id | VARCHAR | 20 | NO | - | å������� ID | PK |
| duty_id | VARCHAR | 20 | NO | - | å�� ID | FK(Duty) |
| executive_id | VARCHAR | 20 | YES | NULL | �ӿ� ID | FK(Executive) |
| title | VARCHAR | 200 | NO | - | ���� | - |
| content | TEXT | - | NO | - | ���� | - |
| responsibilities | TEXT | - | YES | NULL | å�ӻ��� | - |
| authority | TEXT | - | YES | NULL | ���� | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| effective_date | DATE | - | NO | - | ������ | - |
| expiry_date | DATE | - | YES | NULL | ������ | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | ���� (�ʾ�/����/���) | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_DutyDescription: duty_desc_id (Primary Key)
- FK_DutyDescription_Duty: duty_id (Foreign Key)
- FK_DutyDescription_Executive: executive_id (Foreign Key)
- IX_DutyDescription_Title: title
- IX_DutyDescription_Status: status

#### 3.2.3 ExecutiveDuty (�ӿ�-å�� ���� ���̺�)
�ӿ��� å�� ���� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| exec_duty_id | VARCHAR | 20 | NO | - | �ӿ�-å�� ���� ID | PK |
| executive_id | VARCHAR | 20 | NO | - | �ӿ� ID | FK(Executive) |
| duty_id | VARCHAR | 20 | NO | - | å�� ID | FK(Duty) |
| assign_date | DATE | - | NO | - | �Ҵ��� | - |
| release_date | DATE | - | YES | NULL | ������ | - |
| is_primary | BOOLEAN | - | NO | FALSE | �ֿ� å�� ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ExecutiveDuty: exec_duty_id (Primary Key)
- FK_ExecutiveDuty_Executive: executive_id (Foreign Key)
- FK_ExecutiveDuty_Duty: duty_id (Foreign Key)
- UX_ExecutiveDuty_Unique: executive_id, duty_id (Unique)

#### 3.2.4 DutyOrganization (å��-���� ���� ���̺�)
å���� ���� ���� ���� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| duty_org_id | VARCHAR | 20 | NO | - | å��-���� ���� ID | PK |
| duty_id | VARCHAR | 20 | NO | - | å�� ID | FK(Duty) |
| org_id | VARCHAR | 20 | NO | - | ���� ID | FK(Organization) |
| assign_date | DATE | - | NO | - | �Ҵ��� | - |
| release_date | DATE | - | YES | NULL | ������ | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_DutyOrganization: duty_org_id (Primary Key)
- FK_DutyOrganization_Duty: duty_id (Foreign Key)
- FK_DutyOrganization_Organization: org_id (Foreign Key)
- UX_DutyOrganization_Unique: duty_id, org_id (Unique)

#### 3.2.5 ControlManual (�������� �Ŵ��� ���̺�)
�������� �����Ŵ��� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| manual_id | VARCHAR | 20 | NO | - | �Ŵ��� ID | PK |
| dept_id | VARCHAR | 20 | NO | - | �μ� ID | FK(Department) |
| duty_id | VARCHAR | 20 | YES | NULL | ���� å�� ID | FK(Duty) |
| manual_type | VARCHAR | 20 | NO | - | �Ŵ��� ���� (����/�μ���) | - |
| title | VARCHAR | 200 | NO | - | ���� | - |
| content | TEXT | - | NO | - | ���� | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| effective_date | DATE | - | NO | - | ������ | - |
| expiry_date | DATE | - | YES | NULL | ������ | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | ���� (�ʾ�/����/���) | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ControlManual: manual_id (Primary Key)
- FK_ControlManual_Department: dept_id (Foreign Key)
- FK_ControlManual_Duty: duty_id (Foreign Key)
- IX_ControlManual_Title: title
- IX_ControlManual_Type: manual_type
- IX_ControlManual_Status: status

### 3.3 �������� ���� ����

#### 3.3.1 ControlActivity (��������Ȱ�� ���̺�)
��������Ȱ�� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| activity_id | VARCHAR | 20 | NO | - | Ȱ�� ID | PK |
| dept_id | VARCHAR | 20 | NO | - | �μ� ID | FK(Department) |
| manual_id | VARCHAR | 20 | YES | NULL | ���� �Ŵ��� ID | FK(ControlManual) |
| activity_name | VARCHAR | 200 | NO | - | Ȱ���� | - |
| description | TEXT | - | YES | NULL | Ȱ�� ���� | - |
| activity_type | VARCHAR | 20 | NO | - | Ȱ�� ���� | - |
| start_date | DATE | - | NO | - | ������ | - |
| end_date | DATE | - | YES | NULL | ������ | - |
| status | VARCHAR | 20 | NO | 'PLANNED' | ���� (��ȹ/����/�Ϸ�) | - |
| responsible_user_id | VARCHAR | 20 | NO | - | ����� ID | FK(User) |
| approved_by | VARCHAR | 20 | YES | NULL | ������ ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | �����Ͻ� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ControlActivity: activity_id (Primary Key)
- FK_ControlActivity_Department: dept_id (Foreign Key)
- FK_ControlActivity_ControlManual: manual_id (Foreign Key)
- FK_ControlActivity_User_Responsible: responsible_user_id (Foreign Key)
- FK_ControlActivity_User_Approver: approved_by (Foreign Key)
- IX_ControlActivity_Status: status

#### 3.3.2 Checklist (üũ����Ʈ ���̺�)
�������� üũ����Ʈ ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| checklist_id | VARCHAR | 20 | NO | - | üũ����Ʈ ID | PK |
| manual_id | VARCHAR | 20 | YES | NULL | ���� �Ŵ��� ID | FK(ControlManual) |
| checklist_name | VARCHAR | 200 | NO | - | üũ����Ʈ�� | - |
| description | TEXT | - | YES | NULL | ���� | - |
| checklist_type | VARCHAR | 20 | NO | - | üũ����Ʈ ���� | - |
| version | VARCHAR | 20 | NO | '1.0' | ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_Checklist: checklist_id (Primary Key)
- FK_Checklist_ControlManual: manual_id (Foreign Key)
- IX_Checklist_Name: checklist_name
- IX_Checklist_Type: checklist_type

#### 3.3.3 ChecklistItem (üũ����Ʈ �׸� ���̺�)
üũ����Ʈ �׸� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| item_id | VARCHAR | 20 | NO | - | �׸� ID | PK |
| checklist_id | VARCHAR | 20 | NO | - | üũ����Ʈ ID | FK(Checklist) |
| item_no | INT | - | NO | - | �׸� ��ȣ | - |
| content | TEXT | - | NO | - | �׸� ���� | - |
| item_type | VARCHAR | 20 | NO | - | �׸� ���� | - |
| is_required | BOOLEAN | - | NO | TRUE | �ʼ� ���� | - |
| is_active | BOOLEAN | - | NO | TRUE | Ȱ��ȭ ���� | - |
| created_by | VARCHAR | 50 | NO | - | ������ | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | �����Ͻ� | - |
| updated_by | VARCHAR | 50 | YES | NULL | ������ | - |
| updated_at | DATETIME | - | YES | NULL | �����Ͻ� | - |

**�ε���**:
- PK_ChecklistItem: item_id (Primary Key)
- FK_ChecklistItem_Checklist: checklist_id (Foreign Key)
- IX_ChecklistItem_No: checklist_id, item_no

#### 3.3.4 Inspection (�������� ���̺�)
�������� ������ �����ϴ� ���̺�

| �ʵ�� | ������ Ÿ�� | ���� | NULL ��� | �⺻�� | ���� | ��� |
|--------|-------------|------|-----------|--------|------|------|
| inspection_id | VARCHAR | 20 | NO | - | �������� ID | PK |
| dept_id | VARCHAR | 20 | NO | - | �μ� ID | FK(Department) |
| checklist_id | VARCHAR | 20 | NO | - | üũ����Ʈ ID | FK(Checklist) |
| activity_id | VARCHAR | 20 | YES | NULL | ���� Ȱ�� ID | FK(ControlActivity) |
| inspection_name | VARCHAR | 200 | NO | - | �������˸� | - |
| description | TEXT | - | YES | NULL | ���� | - |
| inspection_type | VARCHAR | 20 | NO | - | �������� ���� | - |
| inspection_date | DATE | - | NO | - | ������ | - |
| status | VARCHAR | 20 | NO | 'PLANNED' | ���� (��ȹ/����/�Ϸ�) | - |
| inspector_id | VARCHAR | 20 | NO | - | ������ ID | FK(User) |
| reviewer_id | VARCHAR | 20 | YES | NULL | ������ ID | FK(User) |
| reviewed_at | DATETIME | - | YES | NULL | �����Ͻ� | - |
| approver_id | VARCHAR | 20 | YES | NULL | ������ ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | �����Ͻ� | - |
| result | VARCHAR | 20 | YES | NULL | ���