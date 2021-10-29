const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema } = graphql;

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        topic: { type: GraphQLString },
        date: { type: GraphQLString },
        contributorId: { 
            type: ContributorType,
            resolve (parent, args){
                return _.find(contributors,{id:parent.contributorId}) 
            }
        }
    })
});

const ContributorType = new GraphQLObjectType({
    name: 'Contributor',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        url: { type: GraphQLString },
        major: { type: GraphQLString },
        articles:{
            type: new GraphQLList(ArticleType),
            resolve(parent,args){
                return _.filter(articles, {contributorId:parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        status: {
            type: GraphQLString,
            resolve(parent, args){
                return "Welcome to GraphQL"
            }
        },
        article: {
            type: ArticleType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                return _.find(articles,{'id':args.id})
            }
        },
        contributor: {
            type: ContributorType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                return _.find(contributors,{'id':args.id})
            }
        },
        
    }
});







