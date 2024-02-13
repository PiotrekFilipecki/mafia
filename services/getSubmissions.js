import airDB from './airtableClient';

const getSubmissions = async (maxRecords) => {
    const submissions = await airDB('submissions')
    .select({
        sort: [{ field: 'id', direction: 'desc'}],
        maxRecords
    })
    .firstPage();

    return submissions.map((submission) => submission.fields);
}

export default getSubmissions;