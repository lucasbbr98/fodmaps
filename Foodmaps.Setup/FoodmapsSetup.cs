using StructureMap;
using System;
using System.Collections.Generic;

namespace Foodmaps.Setup
{
    public class FoodmapsSetup
    {
        private Container _cont = null;
        private bool _hasBeenSetup = false;
        private List<Type> _addedTypes = new List<Type>();
        private List<Action<ConfigurationExpression>> _configs
            = new List<Action<ConfigurationExpression>>();

        public Container Container => _hasBeenSetup ? _cont : (_cont = GetContainer());

        private Container GetContainer()
        {
            this._hasBeenSetup = true;
            if (_cont == null)
                _cont = new Container();
            _cont.Configure(c =>
            {
                c.Scan(s =>
                {
                    s.AssembliesAndExecutablesFromApplicationBaseDirectory();
                    s.TheCallingAssembly();
                    s.WithDefaultConventions();
                    foreach (var item in _addedTypes)
                    {
                        s.AddAllTypesOf(item);
                    }
                });

                foreach (var item in _configs)
                    item?.Invoke(c);
            });

            return _cont;
        }

        public FoodmapsSetup AddAllTypes(params Type[] types)
        {
            foreach (var type in types)
                _addedTypes.Add(type);
            return this;
        }

        public FoodmapsSetup AddAllTypes<T>()
        {
            return AddAllTypes(typeof(T));
        }

        public FoodmapsSetup Configure(Action<ConfigurationExpression> config)
        {
            this._configs.Add(config);
            return this;
        }
    }
}
