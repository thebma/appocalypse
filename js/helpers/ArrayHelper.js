function ArrayHelper_RandomElement(collection)
{
    return collection[Math.floor(Math.random() * collection.length)];
}