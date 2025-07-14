# 통합 책무구조도 관리 시스템 DB 설계서

## 1. 개요

### 1.1 목적
본 문서는 통합 책무구조도 관리 시스템의 데이터베이스 설계를 정의한다. 시스템의 요구사항을 효과적으로 지원하기 위한 데이터베이스 구조, 테이블, 필드, 관계 등을 상세히 기술한다.

### 1.2 범위
- 책무정보 관리 데이터
- 이행점검 관리 데이터
- 보고서 관리 데이터
- 결재 관리 데이터
- 시스템 관리 데이터

### 1.3 참조 문서
- 통합 책무구조도 관리 시스템 요구사항 정의서

## 2. 데이터베이스 구조

### 2.1 데이터베이스 개요
- **DBMS**: 관계형 데이터베이스(RDBMS)
- **문자 인코딩**: UTF-8
- **주요 영역**:
  - 조직/인사 관리 영역
  - 책무 관리 영역
  - 이행점검 관리 영역
  - 보고서 관리 영역
  - 결재 관리 영역
  - 시스템 관리 영역

### 2.2 논리적 데이터 모델 (ERD)
통합 책무구조도 관리 시스템의 주요 엔티티와 관계는 다음과 같다:

- 조직(Organization) ↔ 임원/부서장(Executive) : 1:N 관계
- 임원/부서장(Executive) ↔ 책무(Duty) : N:M 관계 (ExecutiveDuty 중간 테이블)
- 책무(Duty) ↔ 책무기술서(DutyDescription) : 1:N 관계
- 책무(Duty) ↔ 내부통제매뉴얼(ControlManual) : 1:N 관계
- 부서(Department) ↔ 내부통제활동(ControlActivity) : 1:N 관계
- 내부통제활동(ControlActivity) ↔ 이행점검(Inspection) : 1:N 관계
- 이행점검(Inspection) ↔ 미흡사항(Improvement) : 1:N 관계
- 문서(Document) ↔ 결재(Approval) : 1:N 관계
- 사용자(User) ↔ 역할(Role) : N:M 관계 (UserRole 중간 테이블)

## 3. 테이블 정의

### 3.1 조직/인사 관리 영역

#### 3.1.1 Organization (조직 테이블)
조직 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| org_id | VARCHAR | 20 | NO | - | 조직 ID | PK |
| org_name | VARCHAR | 100 | NO | - | 조직명 | - |
| org_type | VARCHAR | 20 | NO | - | 조직 유형 (본부, 부서, 팀 등) | - |
| parent_org_id | VARCHAR | 20 | YES | NULL | 상위 조직 ID | FK(Organization) |
| org_level | INT | - | NO | 0 | 조직 레벨 | - |
| description | VARCHAR | 500 | YES | NULL | 조직 설명 | - |
| effective_date | DATE | - | NO | - | 시행일 | - |
| expiry_date | DATE | - | YES | NULL | 만료일 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Organization: org_id (Primary Key)
- IX_Organization_Parent: parent_org_id (Foreign Key)
- IX_Organization_Name: org_name

#### 3.1.2 Department (부서 테이블)
부서 상세 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| dept_id | VARCHAR | 20 | NO | - | 부서 ID | PK |
| org_id | VARCHAR | 20 | NO | - | 조직 ID | FK(Organization) |
| dept_code | VARCHAR | 20 | NO | - | 부서 코드 | - |
| dept_name | VARCHAR | 100 | NO | - | 부서명 | - |
| dept_head_id | VARCHAR | 20 | YES | NULL | 부서장 ID | FK(Executive) |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Department: dept_id (Primary Key)
- FK_Department_Organization: org_id (Foreign Key)
- FK_Department_Executive: dept_head_id (Foreign Key)
- IX_Department_Code: dept_code

#### 3.1.3 Executive (임원/부서장 테이블)
임원 및 부서장 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| executive_id | VARCHAR | 20 | NO | - | 임원/부서장 ID | PK |
| user_id | VARCHAR | 20 | NO | - | 사용자 ID | FK(User) |
| org_id | VARCHAR | 20 | NO | - | 소속 조직 ID | FK(Organization) |
| position | VARCHAR | 50 | NO | - | 직위 | - |
| title | VARCHAR | 50 | YES | NULL | 직책 | - |
| executive_type | VARCHAR | 20 | NO | - | 임원 유형 (임원/부서장) | - |
| appointed_date | DATE | - | NO | - | 임명일 | - |
| resigned_date | DATE | - | YES | NULL | 사임일 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Executive: executive_id (Primary Key)
- FK_Executive_User: user_id (Foreign Key)
- FK_Executive_Organization: org_id (Foreign Key)
- IX_Executive_Position: position
- IX_Executive_Type: executive_type

#### 3.1.4 Committee (협의체 테이블)
협의체 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| committee_id | VARCHAR | 20 | NO | - | 협의체 ID | PK |
| committee_name | VARCHAR | 100 | NO | - | 협의체명 | - |
| committee_type | VARCHAR | 50 | NO | - | 협의체 유형 | - |
| description | VARCHAR | 500 | YES | NULL | 협의체 설명 | - |
| chair_executive_id | VARCHAR | 20 | YES | NULL | 의장 임원 ID | FK(Executive) |
| established_date | DATE | - | NO | - | 설립일 | - |
| disbanded_date | DATE | - | YES | NULL | 해산일 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Committee: committee_id (Primary Key)
- FK_Committee_Executive: chair_executive_id (Foreign Key)
- IX_Committee_Name: committee_name

#### 3.1.5 CommitteeMember (협의체 구성원 테이블)
협의체 구성원 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| committee_member_id | VARCHAR | 20 | NO | - | 협의체 구성원 ID | PK |
| committee_id | VARCHAR | 20 | NO | - | 협의체 ID | FK(Committee) |
| executive_id | VARCHAR | 20 | NO | - | 임원 ID | FK(Executive) |
| role | VARCHAR | 50 | YES | NULL | 역할 | - |
| joined_date | DATE | - | NO | - | 가입일 | - |
| left_date | DATE | - | YES | NULL | 탈퇴일 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_CommitteeMember: committee_member_id (Primary Key)
- FK_CommitteeMember_Committee: committee_id (Foreign Key)
- FK_CommitteeMember_Executive: executive_id (Foreign Key)
- UX_CommitteeMember_Unique: committee_id, executive_id (Unique)

### 3.2 책무 관리 영역

#### 3.2.1 Duty (책무 테이블)
책무 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| duty_id | VARCHAR | 20 | NO | - | 책무 ID | PK |
| duty_code | VARCHAR | 50 | NO | - | 책무 코드 | - |
| duty_name | VARCHAR | 200 | NO | - | 책무명 | - |
| duty_type | VARCHAR | 50 | NO | - | 책무 유형 | - |
| description | TEXT | - | YES | NULL | 책무 설명 | - |
| parent_duty_id | VARCHAR | 20 | YES | NULL | 상위 책무 ID | FK(Duty) |
| duty_level | INT | - | NO | 0 | 책무 레벨 | - |
| priority | INT | - | YES | NULL | 우선순위 | - |
| reg_basis | VARCHAR | 500 | YES | NULL | 법적 근거 | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Duty: duty_id (Primary Key)
- FK_Duty_ParentDuty: parent_duty_id (Foreign Key)
- IX_Duty_Code: duty_code
- IX_Duty_Name: duty_name
- IX_Duty_Type: duty_type

#### 3.2.2 DutyDescription (책무기술서 테이블)
책무기술서 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| duty_desc_id | VARCHAR | 20 | NO | - | 책무기술서 ID | PK |
| duty_id | VARCHAR | 20 | NO | - | 책무 ID | FK(Duty) |
| executive_id | VARCHAR | 20 | YES | NULL | 임원 ID | FK(Executive) |
| title | VARCHAR | 200 | NO | - | 제목 | - |
| content | TEXT | - | NO | - | 내용 | - |
| responsibilities | TEXT | - | YES | NULL | 책임사항 | - |
| authority | TEXT | - | YES | NULL | 권한 | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| effective_date | DATE | - | NO | - | 시행일 | - |
| expiry_date | DATE | - | YES | NULL | 만료일 | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | 상태 (초안/승인/폐기) | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_DutyDescription: duty_desc_id (Primary Key)
- FK_DutyDescription_Duty: duty_id (Foreign Key)
- FK_DutyDescription_Executive: executive_id (Foreign Key)
- IX_DutyDescription_Title: title
- IX_DutyDescription_Status: status

#### 3.2.3 ExecutiveDuty (임원-책무 매핑 테이블)
임원과 책무 간의 매핑 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| exec_duty_id | VARCHAR | 20 | NO | - | 임원-책무 매핑 ID | PK |
| executive_id | VARCHAR | 20 | NO | - | 임원 ID | FK(Executive) |
| duty_id | VARCHAR | 20 | NO | - | 책무 ID | FK(Duty) |
| assign_date | DATE | - | NO | - | 할당일 | - |
| release_date | DATE | - | YES | NULL | 해제일 | - |
| is_primary | BOOLEAN | - | NO | FALSE | 주요 책무 여부 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ExecutiveDuty: exec_duty_id (Primary Key)
- FK_ExecutiveDuty_Executive: executive_id (Foreign Key)
- FK_ExecutiveDuty_Duty: duty_id (Foreign Key)
- UX_ExecutiveDuty_Unique: executive_id, duty_id (Unique)

#### 3.2.4 DutyOrganization (책무-조직 매핑 테이블)
책무와 조직 간의 매핑 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| duty_org_id | VARCHAR | 20 | NO | - | 책무-조직 매핑 ID | PK |
| duty_id | VARCHAR | 20 | NO | - | 책무 ID | FK(Duty) |
| org_id | VARCHAR | 20 | NO | - | 조직 ID | FK(Organization) |
| assign_date | DATE | - | NO | - | 할당일 | - |
| release_date | DATE | - | YES | NULL | 해제일 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_DutyOrganization: duty_org_id (Primary Key)
- FK_DutyOrganization_Duty: duty_id (Foreign Key)
- FK_DutyOrganization_Organization: org_id (Foreign Key)
- UX_DutyOrganization_Unique: duty_id, org_id (Unique)

#### 3.2.5 ControlManual (내부통제 매뉴얼 테이블)
내부통제 업무매뉴얼 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| manual_id | VARCHAR | 20 | NO | - | 매뉴얼 ID | PK |
| dept_id | VARCHAR | 20 | NO | - | 부서 ID | FK(Department) |
| duty_id | VARCHAR | 20 | YES | NULL | 관련 책무 ID | FK(Duty) |
| manual_type | VARCHAR | 20 | NO | - | 매뉴얼 유형 (공통/부서별) | - |
| title | VARCHAR | 200 | NO | - | 제목 | - |
| content | TEXT | - | NO | - | 내용 | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| effective_date | DATE | - | NO | - | 시행일 | - |
| expiry_date | DATE | - | YES | NULL | 만료일 | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | 상태 (초안/승인/폐기) | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ControlManual: manual_id (Primary Key)
- FK_ControlManual_Department: dept_id (Foreign Key)
- FK_ControlManual_Duty: duty_id (Foreign Key)
- IX_ControlManual_Title: title
- IX_ControlManual_Type: manual_type
- IX_ControlManual_Status: status

### 3.3 이행점검 관리 영역

#### 3.3.1 ControlActivity (내부통제활동 테이블)
내부통제활동 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| activity_id | VARCHAR | 20 | NO | - | 활동 ID | PK |
| dept_id | VARCHAR | 20 | NO | - | 부서 ID | FK(Department) |
| manual_id | VARCHAR | 20 | YES | NULL | 관련 매뉴얼 ID | FK(ControlManual) |
| activity_name | VARCHAR | 200 | NO | - | 활동명 | - |
| description | TEXT | - | YES | NULL | 활동 설명 | - |
| activity_type | VARCHAR | 20 | NO | - | 활동 유형 | - |
| start_date | DATE | - | NO | - | 시작일 | - |
| end_date | DATE | - | YES | NULL | 종료일 | - |
| status | VARCHAR | 20 | NO | 'PLANNED' | 상태 (계획/진행/완료) | - |
| responsible_user_id | VARCHAR | 20 | NO | - | 담당자 ID | FK(User) |
| approved_by | VARCHAR | 20 | YES | NULL | 승인자 ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | 승인일시 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ControlActivity: activity_id (Primary Key)
- FK_ControlActivity_Department: dept_id (Foreign Key)
- FK_ControlActivity_ControlManual: manual_id (Foreign Key)
- FK_ControlActivity_User_Responsible: responsible_user_id (Foreign Key)
- FK_ControlActivity_User_Approver: approved_by (Foreign Key)
- IX_ControlActivity_Status: status

#### 3.3.2 Checklist (체크리스트 테이블)
이행점검 체크리스트 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| checklist_id | VARCHAR | 20 | NO | - | 체크리스트 ID | PK |
| manual_id | VARCHAR | 20 | YES | NULL | 관련 매뉴얼 ID | FK(ControlManual) |
| checklist_name | VARCHAR | 200 | NO | - | 체크리스트명 | - |
| description | TEXT | - | YES | NULL | 설명 | - |
| checklist_type | VARCHAR | 20 | NO | - | 체크리스트 유형 | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Checklist: checklist_id (Primary Key)
- FK_Checklist_ControlManual: manual_id (Foreign Key)
- IX_Checklist_Name: checklist_name
- IX_Checklist_Type: checklist_type

#### 3.3.3 ChecklistItem (체크리스트 항목 테이블)
체크리스트 항목 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| item_id | VARCHAR | 20 | NO | - | 항목 ID | PK |
| checklist_id | VARCHAR | 20 | NO | - | 체크리스트 ID | FK(Checklist) |
| item_no | INT | - | NO | - | 항목 번호 | - |
| content | TEXT | - | NO | - | 항목 내용 | - |
| item_type | VARCHAR | 20 | NO | - | 항목 유형 | - |
| is_required | BOOLEAN | - | NO | TRUE | 필수 여부 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ChecklistItem: item_id (Primary Key)
- FK_ChecklistItem_Checklist: checklist_id (Foreign Key)
- IX_ChecklistItem_No: checklist_id, item_no

#### 3.3.4 Inspection (이행점검 테이블)
이행점검 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| inspection_id | VARCHAR | 20 | NO | - | 이행점검 ID | PK |
| dept_id | VARCHAR | 20 | NO | - | 부서 ID | FK(Department) |
| checklist_id | VARCHAR | 20 | NO | - | 체크리스트 ID | FK(Checklist) |
| activity_id | VARCHAR | 20 | YES | NULL | 관련 활동 ID | FK(ControlActivity) |
| inspection_name | VARCHAR | 200 | NO | - | 이행점검명 | - |
| description | TEXT | - | YES | NULL | 설명 | - |
| inspection_type | VARCHAR | 20 | NO | - | 이행점검 유형 | - |
| inspection_date | DATE | - | NO | - | 점검일 | - |
| status | VARCHAR | 20 | NO | 'PLANNED' | 상태 (계획/진행/완료) | - |
| inspector_id | VARCHAR | 20 | NO | - | 점검자 ID | FK(User) |
| reviewer_id | VARCHAR | 20 | YES | NULL | 검토자 ID | FK(User) |
| reviewed_at | DATETIME | - | YES | NULL | 검토일시 | - |
| approver_id | VARCHAR | 20 | YES | NULL | 승인자 ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | 승인일시 | - |
| result | VARCHAR | 20 | YES | NULL | 결과 (적합/부적합) | - |
| comment | TEXT | - | YES | NULL | 코멘트 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Inspection: inspection_id (Primary Key)
- FK_Inspection_Department: dept_id (Foreign Key)
- FK_Inspection_Checklist: checklist_id (Foreign Key)
- FK_Inspection_ControlActivity: activity_id (Foreign Key)
- FK_Inspection_User_Inspector: inspector_id (Foreign Key)
- FK_Inspection_User_Reviewer: reviewer_id (Foreign Key)
- FK_Inspection_User_Approver: approver_id (Foreign Key)
- IX_Inspection_Date: inspection_date
- IX_Inspection_Status: status

#### 3.3.5 InspectionDetail (이행점검 상세 테이블)
이행점검 항목별 결과를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| inspection_detail_id | VARCHAR | 20 | NO | - | 이행점검 상세 ID | PK |
| inspection_id | VARCHAR | 20 | NO | - | 이행점검 ID | FK(Inspection) |
| item_id | VARCHAR | 20 | NO | - | 체크리스트 항목 ID | FK(ChecklistItem) |
| result | VARCHAR | 20 | NO | - | 결과 (적합/부적합/해당없음) | - |
| evidence | TEXT | - | YES | NULL | 증빙내용 | - |
| comment | TEXT | - | YES | NULL | 코멘트 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_InspectionDetail: inspection_detail_id (Primary Key)
- FK_InspectionDetail_Inspection: inspection_id (Foreign Key)
- FK_InspectionDetail_ChecklistItem: item_id (Foreign Key)
- IX_InspectionDetail_Result: result

#### 3.3.6 Improvement (미흡사항/개선계획 테이블)
미흡사항 및 개선계획 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| improvement_id | VARCHAR | 20 | NO | - | 개선계획 ID | PK |
| inspection_id | VARCHAR | 20 | NO | - | 이행점검 ID | FK(Inspection) |
| inspection_detail_id | VARCHAR | 20 | YES | NULL | 이행점검 상세 ID | FK(InspectionDetail) |
| issue_description | TEXT | - | NO | - | 미흡사항 설명 | - |
| cause | TEXT | - | YES | NULL | 원인 | - |
| improvement_plan | TEXT | - | YES | NULL | 개선계획 | - |
| status | VARCHAR | 20 | NO | 'OPEN' | 상태 (오픈/진행/완료) | - |
| priority | VARCHAR | 20 | NO | 'MEDIUM' | 우선순위 (상/중/하) | - |
| due_date | DATE | - | YES | NULL | 완료예정일 | - |
| responsible_user_id | VARCHAR | 20 | NO | - | 담당자 ID | FK(User) |
| completed_date | DATE | - | YES | NULL | 완료일 | - |
| verification_date | DATE | - | YES | NULL | 검증일 | - |
| verified_by | VARCHAR | 20 | YES | NULL | 검증자 ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Improvement: improvement_id (Primary Key)
- FK_Improvement_Inspection: inspection_id (Foreign Key)
- FK_Improvement_InspectionDetail: inspection_detail_id (Foreign Key)
- FK_Improvement_User_Responsible: responsible_user_id (Foreign Key)
- FK_Improvement_User_Verifier: verified_by (Foreign Key)
- IX_Improvement_Status: status
- IX_Improvement_Priority: priority
- IX_Improvement_DueDate: due_date

### 3.4 보고서 관리 영역

#### 3.4.1 Report (보고서 테이블)
보고서 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| report_id | VARCHAR | 20 | NO | - | 보고서 ID | PK |
| report_type | VARCHAR | 50 | NO | - | 보고서 유형 | - |
| title | VARCHAR | 200 | NO | - | 제목 | - |
| description | TEXT | - | YES | NULL | 설명 | - |
| content | TEXT | - | YES | NULL | 내용 | - |
| format | VARCHAR | 20 | NO | 'PDF' | 형식 (PDF/EXCEL/WORD) | - |
| report_date | DATE | - | NO | - | 보고일 | - |
| target | VARCHAR | 50 | NO | - | 대상 (내부/규제기관) | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | 상태 (초안/승인/제출) | - |
| creator_id | VARCHAR | 20 | NO | - | 작성자 ID | FK(User) |
| approver_id | VARCHAR | 20 | YES | NULL | 승인자 ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | 승인일시 | - |
| submitted_at | DATETIME | - | YES | NULL | 제출일시 | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| file_path | VARCHAR | 255 | YES | NULL | 파일 경로 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Report: report_id (Primary Key)
- FK_Report_User_Creator: creator_id (Foreign Key)
- FK_Report_User_Approver: approver_id (Foreign Key)
- IX_Report_Type: report_type
- IX_Report_Date: report_date
- IX_Report_Status: status

#### 3.4.2 ReportTemplate (보고서 템플릿 테이블)
보고서 템플릿 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| template_id | VARCHAR | 20 | NO | - | 템플릿 ID | PK |
| template_name | VARCHAR | 100 | NO | - | 템플릿명 | - |
| template_type | VARCHAR | 50 | NO | - | 템플릿 유형 | - |
| description | TEXT | - | YES | NULL | 설명 | - |
| content | TEXT | - | NO | - | 내용 | - |
| format | VARCHAR | 20 | NO | 'PDF' | 형식 (PDF/EXCEL/WORD) | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ReportTemplate: template_id (Primary Key)
- IX_ReportTemplate_Name: template_name
- IX_ReportTemplate_Type: template_type

#### 3.4.3 ReportAttachment (보고서 첨부파일 테이블)
보고서 첨부파일 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| attachment_id | VARCHAR | 20 | NO | - | 첨부파일 ID | PK |
| report_id | VARCHAR | 20 | NO | - | 보고서 ID | FK(Report) |
| file_name | VARCHAR | 255 | NO | - | 파일명 | - |
| file_path | VARCHAR | 255 | NO | - | 파일 경로 | - |
| file_type | VARCHAR | 50 | NO | - | 파일 유형 | - |
| file_size | INT | - | NO | - | 파일 크기(byte) | - |
| description | VARCHAR | 255 | YES | NULL | 설명 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ReportAttachment: attachment_id (Primary Key)
- FK_ReportAttachment_Report: report_id (Foreign Key)
- IX_ReportAttachment_FileName: file_name

### 3.5 결재 관리 영역

#### 3.5.1 Document (문서 테이블)
결재 대상 문서 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| document_id | VARCHAR | 20 | NO | - | 문서 ID | PK |
| document_type | VARCHAR | 50 | NO | - | 문서 유형 | - |
| title | VARCHAR | 200 | NO | - | 제목 | - |
| content | TEXT | - | NO | - | 내용 | - |
| target_id | VARCHAR | 20 | YES | NULL | 대상 ID (책무/매뉴얼/점검 등) | - |
| target_type | VARCHAR | 50 | YES | NULL | 대상 유형 | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | 상태 (초안/진행/완료/반려) | - |
| creator_id | VARCHAR | 20 | NO | - | 작성자 ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Document: document_id (Primary Key)
- FK_Document_User: creator_id (Foreign Key)
- IX_Document_Type: document_type
- IX_Document_Status: status
- IX_Document_Target: target_id, target_type

#### 3.5.2 Approval (결재 테이블)
결재 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| approval_id | VARCHAR | 20 | NO | - | 결재 ID | PK |
| document_id | VARCHAR | 20 | NO | - | 문서 ID | FK(Document) |
| approval_line_id | VARCHAR | 20 | NO | - | 결재선 ID | FK(ApprovalLine) |
| title | VARCHAR | 200 | NO | - | 제목 | - |
| content | TEXT | - | YES | NULL | 내용 | - |
| status | VARCHAR | 20 | NO | 'REQUESTED' | 상태 (요청/진행/승인/반려) | - |
| requester_id | VARCHAR | 20 | NO | - | 요청자 ID | FK(User) |
| requested_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 요청일시 | - |
| completed_at | DATETIME | - | YES | NULL | 완료일시 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Approval: approval_id (Primary Key)
- FK_Approval_Document: document_id (Foreign Key)
- FK_Approval_ApprovalLine: approval_line_id (Foreign Key)
- FK_Approval_User: requester_id (Foreign Key)
- IX_Approval_Status: status
- IX_Approval_RequestedAt: requested_at

#### 3.5.3 ApprovalLine (결재선 테이블)
결재선 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| approval_line_id | VARCHAR | 20 | NO | - | 결재선 ID | PK |
| line_name | VARCHAR | 100 | NO | - | 결재선명 | - |
| description | VARCHAR | 255 | YES | NULL | 설명 | - |
| document_type | VARCHAR | 50 | YES | NULL | 문서 유형 | - |
| is_template | BOOLEAN | - | NO | FALSE | 템플릿 여부 | - |
| creator_id | VARCHAR | 20 | NO | - | 생성자 ID | FK(User) |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ApprovalLine: approval_line_id (Primary Key)
- FK_ApprovalLine_User: creator_id (Foreign Key)
- IX_ApprovalLine_Name: line_name
- IX_ApprovalLine_DocType: document_type

#### 3.5.4 ApprovalLineDetail (결재선 상세 테이블)
결재선 상세 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| approval_line_detail_id | VARCHAR | 20 | NO | - | 결재선 상세 ID | PK |
| approval_line_id | VARCHAR | 20 | NO | - | 결재선 ID | FK(ApprovalLine) |
| step | INT | - | NO | 1 | 단계 | - |
| approver_id | VARCHAR | 20 | NO | - | 결재자 ID | FK(User) |
| approver_type | VARCHAR | 20 | NO | 'APPROVER' | 결재자 유형 (검토/승인/참조) | - |
| is_mandatory | BOOLEAN | - | NO | TRUE | 필수 여부 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ApprovalLineDetail: approval_line_detail_id (Primary Key)
- FK_ApprovalLineDetail_ApprovalLine: approval_line_id (Foreign Key)
- FK_ApprovalLineDetail_User: approver_id (Foreign Key)
- IX_ApprovalLineDetail_Step: approval_line_id, step

#### 3.5.5 ApprovalHistory (결재 이력 테이블)
결재 이력 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| history_id | VARCHAR | 20 | NO | - | 이력 ID | PK |
| approval_id | VARCHAR | 20 | NO | - | 결재 ID | FK(Approval) |
| approval_line_detail_id | VARCHAR | 20 | NO | - | 결재선 상세 ID | FK(ApprovalLineDetail) |
| approver_id | VARCHAR | 20 | NO | - | 결재자 ID | FK(User) |
| action | VARCHAR | 20 | NO | - | 액션 (승인/반려/위임) | - |
| comment | TEXT | - | YES | NULL | 코멘트 | - |
| action_date | DATETIME | - | NO | CURRENT_TIMESTAMP | 액션일시 | - |
| delegated_to | VARCHAR | 20 | YES | NULL | 위임받은 사용자 ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |

**인덱스**:
- PK_ApprovalHistory: history_id (Primary Key)
- FK_ApprovalHistory_Approval: approval_id (Foreign Key)
- FK_ApprovalHistory_ApprovalLineDetail: approval_line_detail_id (Foreign Key)
- FK_ApprovalHistory_User_Approver: approver_id (Foreign Key)
- FK_ApprovalHistory_User_Delegated: delegated_to (Foreign Key)
- IX_ApprovalHistory_ActionDate: action_date

### 3.6 시스템 관리 영역

#### 3.6.1 User (사용자 테이블)
사용자 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| user_id | VARCHAR | 20 | NO | - | 사용자 ID | PK |
| username | VARCHAR | 50 | NO | - | 사용자명 | - |
| employee_id | VARCHAR | 20 | YES | NULL | 직원번호 | - |
| email | VARCHAR | 100 | NO | - | 이메일 | - |
| password | VARCHAR | 255 | NO | - | 암호화된 비밀번호 | - |
| dept_id | VARCHAR | 20 | YES | NULL | 부서 ID | FK(Department) |
| position | VARCHAR | 50 | YES | NULL | 직위 | - |
| phone | VARCHAR | 20 | YES | NULL | 전화번호 | - |
| status | VARCHAR | 20 | NO | 'ACTIVE' | 상태 (활성/비활성/잠금) | - |
| last_login | DATETIME | - | YES | NULL | 마지막 로그인 | - |
| is_admin | BOOLEAN | - | NO | FALSE | 관리자 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_User: user_id (Primary Key)
- FK_User_Department: dept_id (Foreign Key)
- UX_User_Username: username (Unique)
- UX_User_Email: email (Unique)
- IX_User_EmployeeId: employee_id
- IX_User_Status: status

#### 3.6.2 Role (역할 테이블)
사용자 역할 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| role_id | VARCHAR | 20 | NO | - | 역할 ID | PK |
| role_name | VARCHAR | 50 | NO | - | 역할명 | - |
| description | VARCHAR | 255 | YES | NULL | 설명 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Role: role_id (Primary Key)
- UX_Role_Name: role_name (Unique)

#### 3.6.3 UserRole (사용자-역할 매핑 테이블)
사용자와 역할 간의 매핑 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| user_role_id | VARCHAR | 20 | NO | - | 사용자-역할 매핑 ID | PK |
| user_id | VARCHAR | 20 | NO | - | 사용자 ID | FK(User) |
| role_id | VARCHAR | 20 | NO | - | 역할 ID | FK(Role) |
| granted_date | DATETIME | - | NO | CURRENT_TIMESTAMP | 부여일시 | - |
| granted_by | VARCHAR | 20 | NO | - | 부여자 ID | FK(User) |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_UserRole: user_role_id (Primary Key)
- FK_UserRole_User: user_id (Foreign Key)
- FK_UserRole_Role: role_id (Foreign Key)
- FK_UserRole_User_Granter: granted_by (Foreign Key)
- UX_UserRole_Unique: user_id, role_id (Unique)

#### 3.6.4 Permission (권한 테이블)
시스템 권한 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| permission_id | VARCHAR | 20 | NO | - | 권한 ID | PK |
| permission_name | VARCHAR | 50 | NO | - | 권한명 | - |
| description | VARCHAR | 255 | YES | NULL | 설명 | - |
| resource | VARCHAR | 50 | NO | - | 자원 (메뉴/기능) | - |
| action | VARCHAR | 20 | NO | - | 액션 (조회/생성/수정/삭제) | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Permission: permission_id (Primary Key)
- UX_Permission_Name: permission_name (Unique)
- IX_Permission_Resource: resource, action

#### 3.6.5 RolePermission (역할-권한 매핑 테이블)
역할과 권한 간의 매핑 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| role_permission_id | VARCHAR | 20 | NO | - | 역할-권한 매핑 ID | PK |
| role_id | VARCHAR | 20 | NO | - | 역할 ID | FK(Role) |
| permission_id | VARCHAR | 20 | NO | - | 권한 ID | FK(Permission) |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_RolePermission: role_permission_id (Primary Key)
- FK_RolePermission_Role: role_id (Foreign Key)
- FK_RolePermission_Permission: permission_id (Foreign Key)
- UX_RolePermission_Unique: role_id, permission_id (Unique)

#### 3.6.6 Code (코드 테이블)
시스템 코드 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| code_id | VARCHAR | 20 | NO | - | 코드 ID | PK |
| code_group | VARCHAR | 50 | NO | - | 코드 그룹 | - |
| code | VARCHAR | 50 | NO | - | 코드 | - |
| code_name | VARCHAR | 100 | NO | - | 코드명 | - |
| description | VARCHAR | 255 | YES | NULL | 설명 | - |
| sort_order | INT | - | NO | 0 | 정렬 순서 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Code: code_id (Primary Key)
- UX_Code_Unique: code_group, code (Unique)
- IX_Code_Group: code_group
- IX_Code_SortOrder: code_group, sort_order

#### 3.6.7 AuditLog (감사 로그 테이블)
시스템 감사 로그 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| log_id | VARCHAR | 20 | NO | - | 로그 ID | PK |
| user_id | VARCHAR | 20 | YES | NULL | 사용자 ID | FK(User) |
| action | VARCHAR | 20 | NO | - | 액션 (로그인/로그아웃/조회/생성/수정/삭제) | - |
| entity_type | VARCHAR | 50 | YES | NULL | 엔티티 유형 | - |
| entity_id | VARCHAR | 20 | YES | NULL | 엔티티 ID | - |
| description | TEXT | - | YES | NULL | 설명 | - |
| ip_address | VARCHAR | 50 | YES | NULL | IP 주소 | - |
| user_agent | VARCHAR | 255 | YES | NULL | 사용자 에이전트 | - |
| log_date | DATETIME | - | NO | CURRENT_TIMESTAMP | 로그 일시 | - |
| additional_info | TEXT | - | YES | NULL | 추가 정보 | - |

**인덱스**:
- PK_AuditLog: log_id (Primary Key)
- FK_AuditLog_User: user_id (Foreign Key)
- IX_AuditLog_Action: action
- IX_AuditLog_Entity: entity_type, entity_id
- IX_AuditLog_LogDate: log_date

#### 3.6.8 Notification (알림 테이블)
시스템 알림 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| notification_id | VARCHAR | 20 | NO | - | 알림 ID | PK |
| user_id | VARCHAR | 20 | NO | - | 사용자 ID | FK(User) |
| notification_type | VARCHAR | 50 | NO | - | 알림 유형 | - |
| title | VARCHAR | 200 | NO | - | 제목 | - |
| content | TEXT | - | NO | - | 내용 | - |
| related_entity_type | VARCHAR | 50 | YES | NULL | 관련 엔티티 유형 | - |
| related_entity_id | VARCHAR | 20 | YES | NULL | 관련 엔티티 ID | - |
| is_read | BOOLEAN | - | NO | FALSE | 읽음 여부 | - |
| read_at | DATETIME | - | YES | NULL | 읽은 일시 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| expires_at | DATETIME | - | YES | NULL | 만료일시 | - |

**인덱스**:
- PK_Notification: notification_id (Primary Key)
- FK_Notification_User: user_id (Foreign Key)
- IX_Notification_Type: notification_type
- IX_Notification_IsRead: user_id, is_read
- IX_Notification_CreatedAt: created_at
- IX_Notification_Entity: related_entity_type, related_entity_id

## 4. 데이터베이스 관계 및 제약조건

### 4.1 주요 관계

#### 4.1.1 조직/인사 관련 관계
- **Organization - Department**: 하나의 조직에 여러 부서가 속함 (1:N)
- **Department - Executive**: 하나의 부서에 여러 임원/부서장이 속함 (1:N)
- **Organization - Executive**: 하나의 조직에 여러 임원이 속함 (1:N)
- **Committee - CommitteeMember**: 하나의 협의체에 여러 구성원이 속함 (1:N)
- **Executive - CommitteeMember**: 하나의 임원이 여러 협의체 구성원이 될 수 있음 (1:N)

#### 4.1.2 책무 관련 관계
- **Duty - DutyDescription**: 하나의 책무에 여러 책무기술서가 속함 (1:N)
- **Duty - ExecutiveDuty**: 하나의 책무가 여러 임원에게 할당될 수 있음 (1:N)
- **Executive - ExecutiveDuty**: 하나의 임원에게 여러 책무가 할당될 수 있음 (1:N)
- **Duty - DutyOrganization**: 하나의 책무가 여러 조직에 할당될 수 있음 (1:N)
- **Organization - DutyOrganization**: 하나의 조직에 여러 책무가 할당될 수 있음 (1:N)
- **Duty - ControlManual**: 하나의 책무에 여러 내부통제 매뉴얼이 연관될 수 있음 (1:N)

#### 4.1.3 이행점검 관련 관계
- **Department - ControlActivity**: 하나의 부서에서 여러 내부통제활동을 수행 (1:N)
- **ControlManual - ControlActivity**: 하나의 매뉴얼에 여러 내부통제활동이 연관 (1:N)
- **ControlManual - Checklist**: 하나의 매뉴얼에 여러 체크리스트가 연관 (1:N)
- **Checklist - ChecklistItem**: 하나의 체크리스트에 여러 항목이 포함 (1:N)
- **Department - Inspection**: 하나의 부서에서 여러 이행점검을 수행 (1:N)
- **Checklist - Inspection**: 하나의 체크리스트로 여러 이행점검을 수행 (1:N)
- **ControlActivity - Inspection**: 하나의 내부통제활동에 여러 이행점검이 연관 (1:N)
- **Inspection - InspectionDetail**: 하나의 이행점검에 여러 상세 결과가 포함 (1:N)
- **ChecklistItem - InspectionDetail**: 하나의 체크리스트 항목에 대해 여러 이행점검 상세 결과가 있을 수 있음 (1:N)
- **Inspection - Improvement**: 하나의 이행점검에 여러 미흡사항/개선계획이 있을 수 있음 (1:N)
- **InspectionDetail - Improvement**: 하나의 이행점검 상세에 여러 미흡사항/개선계획이 있을 수 있음 (1:N)

#### 4.1.4 보고서 관련 관계
- **Report - ReportAttachment**: 하나의 보고서에 여러 첨부파일이 있을 수 있음 (1:N)

#### 4.1.5 결재 관련 관계
- **Document - Approval**: 하나의 문서에 여러 결재가 있을 수 있음 (1:N)
- **ApprovalLine - Approval**: 하나의 결재선으로 여러 결재가 이루어질 수 있음 (1:N)
- **ApprovalLine - ApprovalLineDetail**: 하나의 결재선에 여러 결재자가 포함 (1:N)
- **Approval - ApprovalHistory**: 하나의 결재에 여러 이력이 있을 수 있음 (1:N)
- **ApprovalLineDetail - ApprovalHistory**: 하나의 결재선 상세에 여러 이력이 있을 수 있음 (1:N)

#### 4.1.6 사용자/권한 관련 관계
- **User - UserRole**: 하나의 사용자가 여러 역할을 가질 수 있음 (1:N)
- **Role - UserRole**: 하나의 역할에 여러 사용자가 할당될 수 있음 (1:N)
- **Role - RolePermission**: 하나의 역할에 여러 권한이 할당될 수 있음 (1:N)
- **Permission - RolePermission**: 하나의 권한이 여러 역할에 할당될 수 있음 (1:N)

### 4.2 주요 제약조건

#### 4.2.1 기본 키 제약조건
- 모든 테이블은 고유한 기본 키(Primary Key)를 가짐
- 기본 키는 UUID 또는 시퀀스를 활용하여 생성

#### 4.2.2 외래 키 제약조건
- 참조 무결성을 위한 외래 키(Foreign Key) 제약조건 적용
- 부모 레코드 삭제 시 자식 레코드 처리 방식 정의 (CASCADE, SET NULL, RESTRICT 등)

#### 4.2.3 고유 제약조건
- 중복 데이터 방지를 위한 고유(Unique) 제약조건 적용
- 코드, 사용자명, 이메일 등 고유해야 하는 필드에 적용

#### 4.2.4 NULL 제약조건
- 필수 필드에 대한 NOT NULL 제약조건 적용
- 선택적 필드는 NULL 허용

#### 4.2.5 기본값 제약조건
- 생성일시, 상태 등 기본값이 필요한 필드에 DEFAULT 제약조건 적용

## 5. 데이터 마이그레이션

### 5.1 마이그레이션 전략
- 단계적 마이그레이션 접근 방식 채택
- 기존 시스템 데이터 분석 및 매핑
- ETL(Extract, Transform, Load) 프로세스 정의
- 데이터 검증 및 정제 절차 수립

### 5.2 마이그레이션 대상 데이터
- 조직 및 부서 정보
- 임원 및 부서장 정보
- 책무 및 책무기술서 정보
- 내부통제 매뉴얼 정보
- 이행점검 이력 정보
- 사용자 및 권한 정보

### 5.3 마이그레이션 절차
1. 소스 데이터 추출 및 분석
2. 데이터 변환 및 매핑
3. 테스트 환경에서 데이터 로드
4. 데이터 검증 및 무결성 확인
5. 오류 수정 및 재로드
6. 운영 환경으로 데이터 마이그레이션
7. 최종 검증 및 확인

## 6. 데이터베이스 성능 최적화

### 6.1 인덱스 전략
- 조회 성능 향상을 위한 적절한 인덱스 설계
- 복합 인덱스 활용
- 인덱스 사용 모니터링 및 최적화

### 6.2 파티셔닝 전략
- 대용량 테이블(감사 로그, 이력 테이블 등)에 대한 파티셔닝 적용
- 시간 기반 파티셔닝 활용

### 6.3 쿼리 최적화
- 자주 사용되는 쿼리에 대한 최적화
- 실행 계획 분석 및 튜닝
- 적절한 조인 방식 선택

### 6.4 캐싱 전략
- 자주 조회되는 데이터에 대한 캐싱 적용
- 캐시 무효화 전략 수립

## 7. 보안 및 감사

### 7.1 데이터 보안
- 중요 데이터 암호화 적용
- 접근 제어 메커니즘 구현
- 개인정보 보호 방안 적용

### 7.2 감사 추적
- 데이터 변경에 대한 감사 로그 기록
- 사용자 활동 모니터링
- 이상 행위 탐지 메커니즘 구현

## 부록

### A. 용어 정의
- **PK**: Primary Key (기본 키)
- **FK**: Foreign Key (외래 키)
- **UX**: Unique Index (고유 인덱스)
- **IX**: Non-Unique Index (비고유 인덱스)

### B. 변경 이력

| 버전 | 일자 | 변경자 | 변경 내용 | 승인자 |
|------|------|--------|-----------|--------|
| 1.0 | 2025-07-14 | - | 최초 작성 | - || result | VARCHAR | 20 | YES | NULL | 결과 (적합/부적합) | - |
| comment | TEXT | - | YES | NULL | 코멘트 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Inspection: inspection_id (Primary Key)
- FK_Inspection_Department: dept_id (Foreign Key)
- FK_Inspection_Checklist: checklist_id (Foreign Key)
- FK_Inspection_ControlActivity: activity_id (Foreign Key)
- FK_Inspection_User_Inspector: inspector_id (Foreign Key)
- FK_Inspection_User_Reviewer: reviewer_id (Foreign Key)
- FK_Inspection_User_Approver: approver_id (Foreign Key)
- IX_Inspection_Date: inspection_date
- IX_Inspection_Status: status

#### 3.3.5 InspectionDetail (이행점검 상세 테이블)
이행점검 항목별 결과를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| inspection_detail_id | VARCHAR | 20 | NO | - | 이행점검 상세 ID | PK |
| inspection_id | VARCHAR | 20 | NO | - | 이행점검 ID | FK(Inspection) |
| item_id | VARCHAR | 20 | NO | - | 체크리스트 항목 ID | FK(ChecklistItem) |
| result | VARCHAR | 20 | NO | - | 결과 (적합/부적합/해당없음) | - |
| evidence | TEXT | - | YES | NULL | 증빙내용 | - |
| comment | TEXT | - | YES | NULL | 코멘트 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_InspectionDetail: inspection_detail_id (Primary Key)
- FK_InspectionDetail_Inspection: inspection_id (Foreign Key)
- FK_InspectionDetail_ChecklistItem: item_id (Foreign Key)
- IX_InspectionDetail_Result: result

#### 3.3.6 Improvement (미흡사항/개선계획 테이블)
미흡사항 및 개선계획 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| improvement_id | VARCHAR | 20 | NO | - | 개선계획 ID | PK |
| inspection_id | VARCHAR | 20 | NO | - | 이행점검 ID | FK(Inspection) |
| inspection_detail_id | VARCHAR | 20 | YES | NULL | 이행점검 상세 ID | FK(InspectionDetail) |
| issue_description | TEXT | - | NO | - | 미흡사항 설명 | - |
| cause | TEXT | - | YES | NULL | 원인 | - |
| improvement_plan | TEXT | - | YES | NULL | 개선계획 | - |
| status | VARCHAR | 20 | NO | 'OPEN' | 상태 (오픈/진행/완료) | - |
| priority | VARCHAR | 20 | NO | 'MEDIUM' | 우선순위 (상/중/하) | - |
| due_date | DATE | - | YES | NULL | 완료예정일 | - |
| responsible_user_id | VARCHAR | 20 | NO | - | 담당자 ID | FK(User) |
| completed_date | DATE | - | YES | NULL | 완료일 | - |
| verification_date | DATE | - | YES | NULL | 검증일 | - |
| verified_by | VARCHAR | 20 | YES | NULL | 검증자 ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Improvement: improvement_id (Primary Key)
- FK_Improvement_Inspection: inspection_id (Foreign Key)
- FK_Improvement_InspectionDetail: inspection_detail_id (Foreign Key)
- FK_Improvement_User_Responsible: responsible_user_id (Foreign Key)
- FK_Improvement_User_Verifier: verified_by (Foreign Key)
- IX_Improvement_Status: status
- IX_Improvement_Priority: priority
- IX_Improvement_DueDate: due_date

### 3.4 보고서 관리 영역

#### 3.4.1 Report (보고서 테이블)
보고서 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| report_id | VARCHAR | 20 | NO | - | 보고서 ID | PK |
| report_type | VARCHAR | 50 | NO | - | 보고서 유형 | - |
| title | VARCHAR | 200 | NO | - | 제목 | - |
| description | TEXT | - | YES | NULL | 설명 | - |
| content | TEXT | - | YES | NULL | 내용 | - |
| format | VARCHAR | 20 | NO | 'PDF' | 형식 (PDF/EXCEL/WORD) | - |
| report_date | DATE | - | NO | - | 보고일 | - |
| target | VARCHAR | 50 | NO | - | 대상 (내부/규제기관) | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | 상태 (초안/승인/제출) | - |
| creator_id | VARCHAR | 20 | NO | - | 작성자 ID | FK(User) |
| approver_id | VARCHAR | 20 | YES | NULL | 승인자 ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | 승인일시 | - |
| submitted_at | DATETIME | - | YES | NULL | 제출일시 | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| file_path | VARCHAR | 255 | YES | NULL | 파일 경로 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Report: report_id (Primary Key)
- FK_Report_User_Creator: creator_id (Foreign Key)
- FK_Report_User_Approver: approver_id (Foreign Key)
- IX_Report_Type: report_type
- IX_Report_Date: report_date
- IX_Report_Status: status

#### 3.4.2 ReportTemplate (보고서 템플릿 테이블)
보고서 템플릿 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| template_id | VARCHAR | 20 | NO | - | 템플릿 ID | PK |
| template_name | VARCHAR | 100 | NO | - | 템플릿명 | - |
| template_type | VARCHAR | 50 | NO | - | 템플릿 유형 | - |
| description | TEXT | - | YES | NULL | 설명 | - |
| content | TEXT | - | NO | - | 내용 | - |
| format | VARCHAR | 20 | NO | 'PDF' | 형식 (PDF/EXCEL/WORD) | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ReportTemplate: template_id (Primary Key)
- IX_ReportTemplate_Name: template_name
- IX_ReportTemplate_Type: template_type

#### 3.4.3 ReportAttachment (보고서 첨부파일 테이블)
보고서 첨부파일 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| attachment_id | VARCHAR | 20 | NO | - | 첨부파일 ID | PK |
| report_id | VARCHAR | 20 | NO | - | 보고서 ID | FK(Report) |
| file_name | VARCHAR | 255 | NO | - | 파일명 | - |
| file_path | VARCHAR | 255 | NO | - | 파일 경로 | - |
| file_type | VARCHAR | 50 | NO | - | 파일 유형 | - |
| file_size | INT | - | NO | - | 파일 크기(byte) | - |
| description | VARCHAR | 255 | YES | NULL | 설명 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ReportAttachment: attachment_id (Primary Key)
- FK_ReportAttachment_Report: report_id (Foreign Key)
- IX_ReportAttachment_FileName: file_name

### 3.5 결재 관리 영역

#### 3.5.1 Document (문서 테이블)
결재 대상 문서 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| document_id | VARCHAR | 20 | NO | - | 문서 ID | PK |
| document_type | VARCHAR | 50 | NO | - | 문서 유형 | - |
| title | VARCHAR | 200 | NO | - | 제목 | - |
| content | TEXT | - | NO | - | 내용 | - |
| target_id | VARCHAR | 20 | YES | NULL | 대상 ID (책무/매뉴얼/점검 등) | - |
| target_type | VARCHAR | 50 | YES | NULL | 대상 유형 | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | 상태 (초안/진행/완료/반려) | - |
| creator_id | VARCHAR | 20 | NO | - | 작성자 ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Document: document_id (Primary Key)
- FK_Document_User: creator_id (Foreign Key)
- IX_Document_Type: document_type
- IX_Document_Status: status
- IX_Document_Target: target_id, target_type

#### 3.5.2 Approval (결재 테이블)
결재 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| approval_id | VARCHAR | 20 | NO | - | 결재 ID | PK |
| document_id | VARCHAR | 20 | NO | - | 문서 ID | FK(Document) |
| approval_line_id | VARCHAR | 20 | NO | - | 결재선 ID | FK(ApprovalLine) |
| title | VARCHAR | 200 | NO | - | 제목 | - |
| content | TEXT | - | YES | NULL | 내용 | - |
| status | VARCHAR | 20 | NO | 'REQUESTED' | 상태 (요청/진행/승인/반려) | - |
| requester_id | VARCHAR | 20 | NO | - | 요청자 ID | FK(User) |
| requested_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 요청일시 | - |
| completed_at | DATETIME | - | YES | NULL | 완료일시 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Approval: approval_id (Primary Key)
- FK_Approval_Document: document_id (Foreign Key)
- FK_Approval_ApprovalLine: approval_line_id (Foreign Key)
- FK_Approval_User: requester_id (Foreign Key)
- IX_Approval_Status: status
- IX_Approval_RequestedAt: requested_at

#### 3.5.3 ApprovalLine (결재선 테이블)
결재선 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| approval_line_id | VARCHAR | 20 | NO | - | 결재선 ID | PK |
| line_name | VARCHAR | 100 | NO | - | 결재선명 | - |
| description | VARCHAR | 255 | YES | NULL | 설명 | - |
| document_type | VARCHAR | 50 | YES | NULL | 문서 유형 | - |
| is_template | BOOLEAN | - | NO | FALSE | 템플릿 여부 | - |
| creator_id | VARCHAR | 20 | NO | - | 생성자 ID | FK(User) |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ApprovalLine: approval_line_id (Primary Key)
- FK_ApprovalLine_User: creator_id (Foreign Key)
- IX_ApprovalLine_Name: line_name
- IX_ApprovalLine_DocType: document_type

#### 3.5.4 ApprovalLineDetail (결재선 상세 테이블)
결재선 상세 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| approval_line_detail_id | VARCHAR | 20 | NO | - | 결재선 상세 ID | PK |
| approval_line_id | VARCHAR | 20 | NO | - | 결재선 ID | FK(ApprovalLine) |
| step | INT | - | NO | 1 | 단계 | - |
| approver_id | VARCHAR | 20 | NO | - | 결재자 ID | FK(User) |
| approver_type | VARCHAR | 20 | NO | 'APPROVER' | 결재자 유형 (검토/승인/참조) | - |
| is_mandatory | BOOLEAN | - | NO | TRUE | 필수 여부 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ApprovalLineDetail: approval_line_detail_id (Primary Key)
- FK_ApprovalLineDetail_ApprovalLine: approval_line_id (Foreign Key)
- FK_ApprovalLineDetail_User: approver_id (Foreign Key)
- IX_ApprovalLineDetail_Step: approval_line_id, step

#### 3.5.5 ApprovalHistory (결재 이력 테이블)
결재 이력 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| history_id | VARCHAR | 20 | NO | - | 이력 ID | PK |
| approval_id | VARCHAR | 20 | NO | - | 결재 ID | FK(Approval) |
| approval_line_detail_id | VARCHAR | 20 | NO | - | 결재선 상세 ID | FK(ApprovalLineDetail) |
| approver_id | VARCHAR | 20 | NO | - | 결재자 ID | FK(User) |
| action | VARCHAR | 20 | NO | - | 액션 (승인/반려/위임) | - |
| comment | TEXT | - | YES | NULL | 코멘트 | - |
| action_date | DATETIME | - | NO | CURRENT_TIMESTAMP | 액션일시 | - |
| delegated_to | VARCHAR | 20 | YES | NULL | 위임받은 사용자 ID | FK(User) |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |

**인덱스**:
- PK_ApprovalHistory: history_id (Primary Key)
- FK_ApprovalHistory_Approval: approval_id (Foreign Key)
- FK_ApprovalHistory_ApprovalLineDetail: approval_line_detail_id (Foreign Key)
- FK_ApprovalHistory_User_Approver: approver_id (Foreign Key)
- FK_ApprovalHistory_User_Delegated: delegated_to (Foreign Key)
- IX_ApprovalHistory_ActionDate: action_date

### 3.6 시스템 관리 영역

#### 3.6.1 User (사용자 테이블)
사용자 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| user_id | VARCHAR | 20 | NO | - | 사용자 ID | PK |
| username | VARCHAR | 50 | NO | - | 사용자명 | - |
| employee_id | VARCHAR | 20 | YES | NULL | 직원번호 | - |
| email | VARCHAR | 100 | NO | - | 이메일 | - |
| password | VARCHAR | 255 | NO | - | 암호화된 비밀번호 | - |
| dept_id | VARCHAR | 20 | YES | NULL | 부서 ID | FK(Department) |
| position | VARCHAR | 50 | YES | NULL | 직위 | - |
| phone | VARCHAR | 20 | YES | NULL | 전화번호 | - |
| status | VARCHAR | 20 | NO | 'ACTIVE' | 상태 (활성/비활성/잠금) | - |
| last_login | DATETIME | - | YES | NULL | 마지막 로그인 | - |
| is_admin | BOOLEAN | - | NO | FALSE | 관리자 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_User: user_id (Primary Key)
- FK_User_Department: dept_id (Foreign Key)
- UX_User_Username: username (Unique)
- UX_User_Email: email (Unique)
- IX_User_EmployeeId: employee_id
- IX_User_Status: status

#### 3.6.2 Role (역할 테이블)
사용자 역할 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| role_id | VARCHAR | 20 | NO | - | 역할 ID | PK |
| role_name | VARCHAR | 50 | NO | - | 역할명 | - |
| description | VARCHAR | 255 | YES | NULL | 설명 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Role: role_id (Primary Key)
- UX_Role_Name: role_name (Unique)

#### 3.6.3 UserRole (사용자-역할 매핑 테이블)
사용자와 역할 간의 매핑 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| user_role_id | VARCHAR | 20 | NO | - | 사용자-역할 매핑 ID | PK |
| user_id | VARCHAR | 20 | NO | - | 사용자 ID | FK(User) |
| role_id | VARCHAR | 20 | NO | - | 역할 ID | FK(Role) |
| granted_date | DATETIME | - | NO | CURRENT_TIMESTAMP | 부여일시 | - |
| granted_by | VARCHAR | 20 | NO | - | 부여자 ID | FK(User) |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_UserRole: user_role_id (Primary Key)
- FK_UserRole_User: user_id (Foreign Key)
- FK_UserRole_Role: role_id (Foreign Key)
- FK_UserRole_User_Granter: granted_by (Foreign Key)
- UX_UserRole_Unique: user_id, role_id (Unique)

#### 3.6.4 Permission (권한 테이블)
시스템 권한 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| permission_id | VARCHAR | 20 | NO | - | 권한 ID | PK |
| permission_name | VARCHAR | 50 | NO | - | 권한명 | - |
| description | VARCHAR | 255 | YES | NULL | 설명 | - |
| resource | VARCHAR | 50 | NO | - | 자원 (메뉴/기능) | - |
| action | VARCHAR | 20 | NO | - | 액션 (조회/생성/수정/삭제) | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Permission: permission_id (Primary Key)
- UX_Permission_Name: permission_name (Unique)
- IX_Permission_Resource: resource, action

#### 3.6.5 RolePermission (역할-권한 매핑 테이블)
역할과 권한 간의 매핑 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| role_permission_id | VARCHAR | 20 | NO | - | 역할-권한 매핑 ID | PK |
| role_id | VARCHAR | 20 | NO | - | 역할 ID | FK(Role) |
| permission_id | VARCHAR | 20 | NO | - | 권한 ID | FK(Permission) |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_RolePermission: role_permission_id (Primary Key)
- FK_RolePermission_Role: role_id (Foreign Key)
- FK_RolePermission_Permission: permission_id (Foreign Key)
- UX_RolePermission_Unique: role_id, permission_id (Unique)

#### 3.6.6 Code (코드 테이블)
시스템 코드 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| code_id | VARCHAR | 20 | NO | - | 코드 ID | PK |
| code_group | VARCHAR | 50 | NO | - | 코드 그룹 | - |
| code | VARCHAR | 50 | NO | - | 코드 | - |
| code_name | VARCHAR | 100 | NO | - | 코드명 | - |
| description | VARCHAR | 255 | YES | NULL | 설명 | - |
| sort_order | INT | - | NO | 0 | 정렬 순서 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 # 통합 책무구조도 관리 시스템 DB 설계서

## 1. 개요

### 1.1 목적
본 문서는 통합 책무구조도 관리 시스템의 데이터베이스 설계를 정의한다. 시스템의 요구사항을 효과적으로 지원하기 위한 데이터베이스 구조, 테이블, 필드, 관계 등을 상세히 기술한다.

### 1.2 범위
- 책무정보 관리 데이터
- 이행점검 관리 데이터
- 보고서 관리 데이터
- 결재 관리 데이터
- 시스템 관리 데이터

### 1.3 참조 문서
- 통합 책무구조도 관리 시스템 요구사항 정의서

## 2. 데이터베이스 구조

### 2.1 데이터베이스 개요
- **DBMS**: 관계형 데이터베이스(RDBMS)
- **문자 인코딩**: UTF-8
- **주요 영역**:
  - 조직/인사 관리 영역
  - 책무 관리 영역
  - 이행점검 관리 영역
  - 보고서 관리 영역
  - 결재 관리 영역
  - 시스템 관리 영역

### 2.2 논리적 데이터 모델 (ERD)
통합 책무구조도 관리 시스템의 주요 엔티티와 관계는 다음과 같다:

- 조직(Organization) ↔ 임원/부서장(Executive) : 1:N 관계
- 임원/부서장(Executive) ↔ 책무(Duty) : N:M 관계 (ExecutiveDuty 중간 테이블)
- 책무(Duty) ↔ 책무기술서(DutyDescription) : 1:N 관계
- 책무(Duty) ↔ 내부통제매뉴얼(ControlManual) : 1:N 관계
- 부서(Department) ↔ 내부통제활동(ControlActivity) : 1:N 관계
- 내부통제활동(ControlActivity) ↔ 이행점검(Inspection) : 1:N 관계
- 이행점검(Inspection) ↔ 미흡사항(Improvement) : 1:N 관계
- 문서(Document) ↔ 결재(Approval) : 1:N 관계
- 사용자(User) ↔ 역할(Role) : N:M 관계 (UserRole 중간 테이블)

## 3. 테이블 정의

### 3.1 조직/인사 관리 영역

#### 3.1.1 Organization (조직 테이블)
조직 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| org_id | VARCHAR | 20 | NO | - | 조직 ID | PK |
| org_name | VARCHAR | 100 | NO | - | 조직명 | - |
| org_type | VARCHAR | 20 | NO | - | 조직 유형 (본부, 부서, 팀 등) | - |
| parent_org_id | VARCHAR | 20 | YES | NULL | 상위 조직 ID | FK(Organization) |
| org_level | INT | - | NO | 0 | 조직 레벨 | - |
| description | VARCHAR | 500 | YES | NULL | 조직 설명 | - |
| effective_date | DATE | - | NO | - | 시행일 | - |
| expiry_date | DATE | - | YES | NULL | 만료일 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Organization: org_id (Primary Key)
- IX_Organization_Parent: parent_org_id (Foreign Key)
- IX_Organization_Name: org_name

#### 3.1.2 Department (부서 테이블)
부서 상세 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| dept_id | VARCHAR | 20 | NO | - | 부서 ID | PK |
| org_id | VARCHAR | 20 | NO | - | 조직 ID | FK(Organization) |
| dept_code | VARCHAR | 20 | NO | - | 부서 코드 | - |
| dept_name | VARCHAR | 100 | NO | - | 부서명 | - |
| dept_head_id | VARCHAR | 20 | YES | NULL | 부서장 ID | FK(Executive) |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Department: dept_id (Primary Key)
- FK_Department_Organization: org_id (Foreign Key)
- FK_Department_Executive: dept_head_id (Foreign Key)
- IX_Department_Code: dept_code

#### 3.1.3 Executive (임원/부서장 테이블)
임원 및 부서장 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| executive_id | VARCHAR | 20 | NO | - | 임원/부서장 ID | PK |
| user_id | VARCHAR | 20 | NO | - | 사용자 ID | FK(User) |
| org_id | VARCHAR | 20 | NO | - | 소속 조직 ID | FK(Organization) |
| position | VARCHAR | 50 | NO | - | 직위 | - |
| title | VARCHAR | 50 | YES | NULL | 직책 | - |
| executive_type | VARCHAR | 20 | NO | - | 임원 유형 (임원/부서장) | - |
| appointed_date | DATE | - | NO | - | 임명일 | - |
| resigned_date | DATE | - | YES | NULL | 사임일 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Executive: executive_id (Primary Key)
- FK_Executive_User: user_id (Foreign Key)
- FK_Executive_Organization: org_id (Foreign Key)
- IX_Executive_Position: position
- IX_Executive_Type: executive_type

#### 3.1.4 Committee (협의체 테이블)
협의체 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| committee_id | VARCHAR | 20 | NO | - | 협의체 ID | PK |
| committee_name | VARCHAR | 100 | NO | - | 협의체명 | - |
| committee_type | VARCHAR | 50 | NO | - | 협의체 유형 | - |
| description | VARCHAR | 500 | YES | NULL | 협의체 설명 | - |
| chair_executive_id | VARCHAR | 20 | YES | NULL | 의장 임원 ID | FK(Executive) |
| established_date | DATE | - | NO | - | 설립일 | - |
| disbanded_date | DATE | - | YES | NULL | 해산일 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Committee: committee_id (Primary Key)
- FK_Committee_Executive: chair_executive_id (Foreign Key)
- IX_Committee_Name: committee_name

#### 3.1.5 CommitteeMember (협의체 구성원 테이블)
협의체 구성원 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| committee_member_id | VARCHAR | 20 | NO | - | 협의체 구성원 ID | PK |
| committee_id | VARCHAR | 20 | NO | - | 협의체 ID | FK(Committee) |
| executive_id | VARCHAR | 20 | NO | - | 임원 ID | FK(Executive) |
| role | VARCHAR | 50 | YES | NULL | 역할 | - |
| joined_date | DATE | - | NO | - | 가입일 | - |
| left_date | DATE | - | YES | NULL | 탈퇴일 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_CommitteeMember: committee_member_id (Primary Key)
- FK_CommitteeMember_Committee: committee_id (Foreign Key)
- FK_CommitteeMember_Executive: executive_id (Foreign Key)
- UX_CommitteeMember_Unique: committee_id, executive_id (Unique)

### 3.2 책무 관리 영역

#### 3.2.1 Duty (책무 테이블)
책무 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| duty_id | VARCHAR | 20 | NO | - | 책무 ID | PK |
| duty_code | VARCHAR | 50 | NO | - | 책무 코드 | - |
| duty_name | VARCHAR | 200 | NO | - | 책무명 | - |
| duty_type | VARCHAR | 50 | NO | - | 책무 유형 | - |
| description | TEXT | - | YES | NULL | 책무 설명 | - |
| parent_duty_id | VARCHAR | 20 | YES | NULL | 상위 책무 ID | FK(Duty) |
| duty_level | INT | - | NO | 0 | 책무 레벨 | - |
| priority | INT | - | YES | NULL | 우선순위 | - |
| reg_basis | VARCHAR | 500 | YES | NULL | 법적 근거 | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Duty: duty_id (Primary Key)
- FK_Duty_ParentDuty: parent_duty_id (Foreign Key)
- IX_Duty_Code: duty_code
- IX_Duty_Name: duty_name
- IX_Duty_Type: duty_type

#### 3.2.2 DutyDescription (책무기술서 테이블)
책무기술서 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| duty_desc_id | VARCHAR | 20 | NO | - | 책무기술서 ID | PK |
| duty_id | VARCHAR | 20 | NO | - | 책무 ID | FK(Duty) |
| executive_id | VARCHAR | 20 | YES | NULL | 임원 ID | FK(Executive) |
| title | VARCHAR | 200 | NO | - | 제목 | - |
| content | TEXT | - | NO | - | 내용 | - |
| responsibilities | TEXT | - | YES | NULL | 책임사항 | - |
| authority | TEXT | - | YES | NULL | 권한 | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| effective_date | DATE | - | NO | - | 시행일 | - |
| expiry_date | DATE | - | YES | NULL | 만료일 | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | 상태 (초안/승인/폐기) | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_DutyDescription: duty_desc_id (Primary Key)
- FK_DutyDescription_Duty: duty_id (Foreign Key)
- FK_DutyDescription_Executive: executive_id (Foreign Key)
- IX_DutyDescription_Title: title
- IX_DutyDescription_Status: status

#### 3.2.3 ExecutiveDuty (임원-책무 매핑 테이블)
임원과 책무 간의 매핑 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| exec_duty_id | VARCHAR | 20 | NO | - | 임원-책무 매핑 ID | PK |
| executive_id | VARCHAR | 20 | NO | - | 임원 ID | FK(Executive) |
| duty_id | VARCHAR | 20 | NO | - | 책무 ID | FK(Duty) |
| assign_date | DATE | - | NO | - | 할당일 | - |
| release_date | DATE | - | YES | NULL | 해제일 | - |
| is_primary | BOOLEAN | - | NO | FALSE | 주요 책무 여부 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ExecutiveDuty: exec_duty_id (Primary Key)
- FK_ExecutiveDuty_Executive: executive_id (Foreign Key)
- FK_ExecutiveDuty_Duty: duty_id (Foreign Key)
- UX_ExecutiveDuty_Unique: executive_id, duty_id (Unique)

#### 3.2.4 DutyOrganization (책무-조직 매핑 테이블)
책무와 조직 간의 매핑 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| duty_org_id | VARCHAR | 20 | NO | - | 책무-조직 매핑 ID | PK |
| duty_id | VARCHAR | 20 | NO | - | 책무 ID | FK(Duty) |
| org_id | VARCHAR | 20 | NO | - | 조직 ID | FK(Organization) |
| assign_date | DATE | - | NO | - | 할당일 | - |
| release_date | DATE | - | YES | NULL | 해제일 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_DutyOrganization: duty_org_id (Primary Key)
- FK_DutyOrganization_Duty: duty_id (Foreign Key)
- FK_DutyOrganization_Organization: org_id (Foreign Key)
- UX_DutyOrganization_Unique: duty_id, org_id (Unique)

#### 3.2.5 ControlManual (내부통제 매뉴얼 테이블)
내부통제 업무매뉴얼 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| manual_id | VARCHAR | 20 | NO | - | 매뉴얼 ID | PK |
| dept_id | VARCHAR | 20 | NO | - | 부서 ID | FK(Department) |
| duty_id | VARCHAR | 20 | YES | NULL | 관련 책무 ID | FK(Duty) |
| manual_type | VARCHAR | 20 | NO | - | 매뉴얼 유형 (공통/부서별) | - |
| title | VARCHAR | 200 | NO | - | 제목 | - |
| content | TEXT | - | NO | - | 내용 | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| effective_date | DATE | - | NO | - | 시행일 | - |
| expiry_date | DATE | - | YES | NULL | 만료일 | - |
| status | VARCHAR | 20 | NO | 'DRAFT' | 상태 (초안/승인/폐기) | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ControlManual: manual_id (Primary Key)
- FK_ControlManual_Department: dept_id (Foreign Key)
- FK_ControlManual_Duty: duty_id (Foreign Key)
- IX_ControlManual_Title: title
- IX_ControlManual_Type: manual_type
- IX_ControlManual_Status: status

### 3.3 이행점검 관리 영역

#### 3.3.1 ControlActivity (내부통제활동 테이블)
내부통제활동 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| activity_id | VARCHAR | 20 | NO | - | 활동 ID | PK |
| dept_id | VARCHAR | 20 | NO | - | 부서 ID | FK(Department) |
| manual_id | VARCHAR | 20 | YES | NULL | 관련 매뉴얼 ID | FK(ControlManual) |
| activity_name | VARCHAR | 200 | NO | - | 활동명 | - |
| description | TEXT | - | YES | NULL | 활동 설명 | - |
| activity_type | VARCHAR | 20 | NO | - | 활동 유형 | - |
| start_date | DATE | - | NO | - | 시작일 | - |
| end_date | DATE | - | YES | NULL | 종료일 | - |
| status | VARCHAR | 20 | NO | 'PLANNED' | 상태 (계획/진행/완료) | - |
| responsible_user_id | VARCHAR | 20 | NO | - | 담당자 ID | FK(User) |
| approved_by | VARCHAR | 20 | YES | NULL | 승인자 ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | 승인일시 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ControlActivity: activity_id (Primary Key)
- FK_ControlActivity_Department: dept_id (Foreign Key)
- FK_ControlActivity_ControlManual: manual_id (Foreign Key)
- FK_ControlActivity_User_Responsible: responsible_user_id (Foreign Key)
- FK_ControlActivity_User_Approver: approved_by (Foreign Key)
- IX_ControlActivity_Status: status

#### 3.3.2 Checklist (체크리스트 테이블)
이행점검 체크리스트 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| checklist_id | VARCHAR | 20 | NO | - | 체크리스트 ID | PK |
| manual_id | VARCHAR | 20 | YES | NULL | 관련 매뉴얼 ID | FK(ControlManual) |
| checklist_name | VARCHAR | 200 | NO | - | 체크리스트명 | - |
| description | TEXT | - | YES | NULL | 설명 | - |
| checklist_type | VARCHAR | 20 | NO | - | 체크리스트 유형 | - |
| version | VARCHAR | 20 | NO | '1.0' | 버전 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_Checklist: checklist_id (Primary Key)
- FK_Checklist_ControlManual: manual_id (Foreign Key)
- IX_Checklist_Name: checklist_name
- IX_Checklist_Type: checklist_type

#### 3.3.3 ChecklistItem (체크리스트 항목 테이블)
체크리스트 항목 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| item_id | VARCHAR | 20 | NO | - | 항목 ID | PK |
| checklist_id | VARCHAR | 20 | NO | - | 체크리스트 ID | FK(Checklist) |
| item_no | INT | - | NO | - | 항목 번호 | - |
| content | TEXT | - | NO | - | 항목 내용 | - |
| item_type | VARCHAR | 20 | NO | - | 항목 유형 | - |
| is_required | BOOLEAN | - | NO | TRUE | 필수 여부 | - |
| is_active | BOOLEAN | - | NO | TRUE | 활성화 여부 | - |
| created_by | VARCHAR | 50 | NO | - | 생성자 | - |
| created_at | DATETIME | - | NO | CURRENT_TIMESTAMP | 생성일시 | - |
| updated_by | VARCHAR | 50 | YES | NULL | 수정자 | - |
| updated_at | DATETIME | - | YES | NULL | 수정일시 | - |

**인덱스**:
- PK_ChecklistItem: item_id (Primary Key)
- FK_ChecklistItem_Checklist: checklist_id (Foreign Key)
- IX_ChecklistItem_No: checklist_id, item_no

#### 3.3.4 Inspection (이행점검 테이블)
이행점검 정보를 관리하는 테이블

| 필드명 | 데이터 타입 | 길이 | NULL 허용 | 기본값 | 설명 | 비고 |
|--------|-------------|------|-----------|--------|------|------|
| inspection_id | VARCHAR | 20 | NO | - | 이행점검 ID | PK |
| dept_id | VARCHAR | 20 | NO | - | 부서 ID | FK(Department) |
| checklist_id | VARCHAR | 20 | NO | - | 체크리스트 ID | FK(Checklist) |
| activity_id | VARCHAR | 20 | YES | NULL | 관련 활동 ID | FK(ControlActivity) |
| inspection_name | VARCHAR | 200 | NO | - | 이행점검명 | - |
| description | TEXT | - | YES | NULL | 설명 | - |
| inspection_type | VARCHAR | 20 | NO | - | 이행점검 유형 | - |
| inspection_date | DATE | - | NO | - | 점검일 | - |
| status | VARCHAR | 20 | NO | 'PLANNED' | 상태 (계획/진행/완료) | - |
| inspector_id | VARCHAR | 20 | NO | - | 점검자 ID | FK(User) |
| reviewer_id | VARCHAR | 20 | YES | NULL | 검토자 ID | FK(User) |
| reviewed_at | DATETIME | - | YES | NULL | 검토일시 | - |
| approver_id | VARCHAR | 20 | YES | NULL | 승인자 ID | FK(User) |
| approved_at | DATETIME | - | YES | NULL | 승인일시 | - |
| result | VARCHAR | 20 | YES | NULL | 결과