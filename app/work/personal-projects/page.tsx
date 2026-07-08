import { redirect } from 'next/navigation';

// Personal Projects no longer has a dedicated page: the posters and their
// detail sheets now live inline in the Work section on the home page.
export default function PersonalProjectsPage() {
  redirect('/#work');
}
