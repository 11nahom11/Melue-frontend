// screens/programdirector/components/pdNavRoutes.js
import type { ProgramDirectorStackParamList } from '../../../types';

export const PD_ROUTE_BY_TAB: Record<string, keyof ProgramDirectorStackParamList> = {
  Dashboard: 'ProgramDirectorDashboard',
  Assessments: 'AssessmentReview',
  IUP: 'IupGeneration',
  Library: 'IupLibrary',
  Caseload: 'StudentCaseload',
  'Goal Bank': 'GoalBankManagement',
  Charts: 'GraphChartView',
  Parents: 'PdParentCommunication',
};
