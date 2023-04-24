import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import PropertiesDetails from '../components/properties/PropertiesDetails';

async function PropertiesPage() {
  const currentUser = await getCurrentUser();
  const listings = await getListings({
    userId: currentUser?.id,
  });

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized!"
          subtitle="Please login to your account!"
        />
      </ClientOnly>
    );
  }

  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found!"
          subtitle="Looks like you have no properties. "
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesDetails currentUser={currentUser} listings={listings} />
    </ClientOnly>
  );
}

export default PropertiesPage;
