package lt.vtvpmc.ems.isveikata.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtvpmc.ems.isveikata.mapper.ApiMapper;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ApiService {

    @Autowired
    private JpaApiRepository apiRepository;

    public void createApi(ApiDto api) {
        apiRepository.save(ApiMapper.MAPPER.toApi(api));
    }

    public List<ApiDto> getAllApi() {
        return ApiMapper.MAPPER.fromApis(apiRepository.findAll());
    }
}
