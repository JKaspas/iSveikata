package lt.vtvpmc.ems.isveikata.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ApiService {

    @Autowired
    private JpaApiRepository apiRepository;

    public void createApi(Api api) {
        apiRepository.save(api);
    }

    public List<Api> getAllApi() {
        return apiRepository.findAll();
    }
}
