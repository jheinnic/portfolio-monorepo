// /**
//  * The `MODULE_ID` symbol enabled a means for modules to map themselves to the symbol they
//  * have chosen to represent them.  If there is a need to map from that identifier back to
//  * this module, this interface is the designated place to provide that inverse map by use
//  * of Typescript module augmentation.  The gist is to use an augmenting module definition
//  * to insert a computed property mapping from Module ID to Module Class.
//  *
//  * This should be considered experimental for now.  It is not clear whether library
//  * components that are unaware of what modules have been imported when a name is wired
//  * through this feature have sufficient visibility on the effects of module augmentation
//  * to be able to act on information provided this way--it may be that a module has to
//  * depend (either directly or by **nnnghg what's that word for Maven dependencies?***)
//  * in order to "see" the effects of an augmentation.
//  */
// export interface IModuleRegistry
// {
// }
