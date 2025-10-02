import AdminProjectsTable from '@/components/modules/admin/project/AdminProjectsTable';
import { getAllProject } from '@/services/ProjectService';

const AdminProjectsPageWrapper = async() => {
  const projects = await getAllProject();

  return <AdminProjectsTable initialProjects={projects} />;
};

export default AdminProjectsPageWrapper;