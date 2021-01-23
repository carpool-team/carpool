const {useSelector, useDispatch} = require('react-redux');
import * as actions from '../store/actions';

const useActiveAccount = () => {
  const activeAccount = useSelector(
    state => state.accountReducer.activeAccount,
  );

  const dispatch = useDispatch();

  const toggleActiveAccount = () => dispatch(actions.toggleActiveAccount());

  return {activeAccount, toggleActiveAccount};
};

export default useActiveAccount;
