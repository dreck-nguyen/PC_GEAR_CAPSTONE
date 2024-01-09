export function getServiceList() {
  const text = `
  SELECT *
	FROM public.service s
  INNER JOIN service_type st
    ON st.service_type_id= s.service_type_id`;
  const values = [];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getServiceDetails(serviceId) {
  const text = `
  SELECT *
	FROM public.service s
  INNER JOIN service_type st
    ON st.service_type_id= s.service_type_id
  WHERE s.service_id = $1`;
  const values = [serviceId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function deleteService(serviceId) {
  const text = `
 DELETE FROM public.service
	WHERE service_id=$1`;
  const values = [serviceId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
