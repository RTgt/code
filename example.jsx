import { getEnv, types } from 'mobx-state-tree';
import { Form } from 'CommonModels';

const defaultRoleFormData = { status:1 };

const CreateRoleFormModel = Form.named('CreateRoleFormModel')
  .props({
    data: types.optional(
      types.model({
        name: types.optional(types.union(types.string, types.number), ''),
        status: types.maybeNull(types.integer),
        autoAssign: types.maybeNull(types.integer),
        onlySalary: types.maybeNull(types.number),
        requiredExperience: types.maybeNull(types.number),
        flexible: types.maybeNull(types.number),
        flexibleRateStep:types.maybeNull(types.number),
        flexibleRateMax:types.maybeNull(types.number),
        flexibleTimeStep:types.maybeNull(types.number),
      }),
      defaultRoleFormData
    )
  })
  .actions((self) => {
    const invokeRequest = ({ name, ...data }) =>
      getEnv(self).api.roles.createNewRole({ name: name.toString(), ...data});

    const afterRequest = () => {
      getEnv(self).api.roles.getRoles();
      getEnv(self).snackBar.show('Операция выполнена успешно', { variant: 'success' });
    };

    const parseErrors = err => {
      const errors = getEnv(self).api.parseErrors(err);
      return errors;
    };

    return {  invokeRequest, parseErrors, afterRequest };
  });
export { CreateRoleFormModel };
